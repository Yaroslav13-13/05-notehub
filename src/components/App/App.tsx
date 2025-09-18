import React, { useState } from "react";
import Loader from "../Loader/Loader";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotes,
  createNote,
  deleteNote,
  type CreateNotePayload,
} from "../../services/noteService";
import { useDebounce } from "use-debounce";

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
  });

  const mutationCreate = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleCreateNote = async (note: CreateNotePayload) => {
    await mutationCreate.mutateAsync(note);
  };

  const handleDeleteNote = (id: string) => {
    mutationDelete.mutate(id);
  };

  const notes = Array.isArray(data?.notes) ? data!.notes : [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      {/* --- HEADER --- */}
      <header className={css.header}>
        <h1 className={css.title}>NoteHub</h1>
        <SearchBox value={search} onChange={setSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          + Create note
        </button>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className={css.main}>
        {isLoading && <Loader />}
        {isError && <p>Error loading notes</p>}

        {notes.length > 0 ? (
          <NoteList notes={notes} onDelete={handleDeleteNote} />
        ) : (
          !isLoading && <p className={css.empty}>No notes found</p>
        )}
      </main>

      {/* --- FOOTER PAGINATION --- */}
      <footer className={css.footer}>
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </footer>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCreate={handleCreateNote}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
