import React, { useState, useEffect } from "react";
import css from "./App.module.css";
import Loader from "../Loader/Loader";
import Notification from "../Notification/Notification";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import {
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  fetchNotes,
  createNote,
  deleteNote,
  type CreateNotePayload,
} from "../../services/noteService";
import { useDebounce } from "use-debounce";
import type { Note, FetchNotesResponse } from "../../types/note";
import { useQuery } from "@tanstack/react-query";
// import type { UseQueryOptions } from "@tanstack/react-query";

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // ======= useQuery для нотаток =======

  const options: UseQueryOptions<FetchNotesResponse, Error> = {
    queryKey: ["notes", page, debouncedSearch],
    queryFn: async () => {
      const response = await fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
      });
      if (!response || !Array.isArray(response.notes))
        throw new Error("Invalid response");
      return response;
    },
  } as any;

  const { data, isLoading, isError } = useQuery(options);

  // ======= Мутація для створення нотатки =======
  const mutationCreate = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
      setNotification("Note created successfully");
    },
    onError: (error) =>
      setNotification(`Error creating note: ${error?.message ?? ""}`),
  });

  // ======= Мутація для видалення нотатки =======
  const mutationDelete = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setNotification("Note deleted successfully");
    },
    onError: (error) =>
      setNotification(`Error deleting note: ${error?.message ?? ""}`),
  });

  // ======= Обробники =======
  const handleCreateNote = async (note: CreateNotePayload) => {
    await mutationCreate.mutateAsync(note);
  };

  const handleDeleteNote = (id: string) => {
    mutationDelete.mutate(id);
  };

  // ======= Данні для списку і пагінації =======
  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 0;

  // ======= Автовидалення notification =======
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 2500);
    return () => clearTimeout(timer);
  }, [notification]);

  // ======= Повідомлення про відсутність нотаток =======
  useEffect(() => {
    if (!isLoading && !isError && debouncedSearch && notes.length === 0) {
      setNotification("No notes found");
    }
  }, [isLoading, isError, notes.length, debouncedSearch]);

  return (
    <div className={css.app}>
      {/* HEADER */}
      <header className={css.header}>
        <div className={css.box}>
          <a href="/index.html" className={css.title}>
            NoteHub
          </a>
        </div>

        <div className={css.actions}>
          <SearchBox value={search} onChange={setSearch} />
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            + Create note
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className={css.main}>
        {isLoading && <Loader />}
        {notes.length > 0 && (
          <NoteList notes={notes} onDelete={handleDeleteNote} />
        )}
      </main>

      {/* PAGINATION */}
      <footer className={css.footer}>
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </footer>

      {/* MODAL */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCreate={handleCreateNote}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default App;
