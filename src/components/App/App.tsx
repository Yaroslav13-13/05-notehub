import React, { useState, useEffect } from "react";
import css from "./App.module.css";
import Loader from "../Loader/Loader";
import Notification from "../Notification/Notification";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useDebounce } from "use-debounce";
import type { Note } from "../../types/note";

type NotificationType = "success" | "error";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationType, setNotificationType] =
    useState<NotificationType>("success");

  // ======= useQuery для нотаток =======
  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: async () => {
      const response = await fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
      });
      if (!response || !Array.isArray(response.notes)) {
        throw new Error("Invalid response from server");
      }
      return response;
    },
    placeholderData: (previousData) => previousData,
  });

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
      setNotificationType("error"); // червоний
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
        {notes.length > 0 && <NoteList notes={notes} />}
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
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <Notification
          message={notification}
          type={notificationType}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default App;
