// import React, { useState } from "react";
// import Loader from "../Loader/Loader";
// import css from "./App.module.css";
// import SearchBox from "../SearchBox/SearchBox";
// import NoteList from "../NoteList/NoteList";
// import Pagination from "../Pagination/Pagination";
// import Modal from "../Modal/Modal";
// import NoteForm from "../NoteForm/NoteForm";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchNotes,
//   createNote,
//   deleteNote,
//   type CreateNotePayload,
// } from "../../services/noteService";
// import { useDebounce } from "use-debounce";

// const App: React.FC = () => {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [debouncedSearch] = useDebounce(search, 500);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const queryClient = useQueryClient();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["notes", page, debouncedSearch],
//     queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
//   });

//   const mutationCreate = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       setIsModalOpen(false);
//     },
//   });

//   const mutationDelete = useMutation({
//     mutationFn: deleteNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//     },
//   });

//   const handleCreateNote = async (note: CreateNotePayload) => {
//     await mutationCreate.mutateAsync(note);
//   };

//   const handleDeleteNote = (id: string) => {
//     mutationDelete.mutate(id);
//   };

//   const notes = Array.isArray(data?.notes) ? data!.notes : [];
//   const totalPages = data?.totalPages ?? 0;

//   return (
//     <div className={css.app}>
//       {/* --- HEADER --- */}
//       <header className={css.header}>
//         <h1 className={css.title}>NoteHub</h1>
//         <SearchBox value={search} onChange={setSearch} />
//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           + Create note
//         </button>
//       </header>

//       {/* --- MAIN CONTENT --- */}
//       <main className={css.main}>
//         {isLoading && <Loader />}
//         {isError && <p>Error loading notes</p>}

//         {notes.length > 0 ? (
//           <NoteList notes={notes} onDelete={handleDeleteNote} />
//         ) : (
//           !isLoading && <p className={css.empty}>No notes found</p>
//         )}
//       </main>

//       {/* --- FOOTER PAGINATION --- */}
//       <footer className={css.footer}>
//         {totalPages > 1 && (
//           <Pagination
//             page={page}
//             totalPages={totalPages}
//             onPageChange={setPage}
//           />
//         )}
//       </footer>

//       {/* --- MODAL --- */}
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm
//             onCreate={handleCreateNote}
//             onCancel={() => setIsModalOpen(false)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default App;

// !==========================================================

// import React, { useState } from "react";
// import css from "./App.module.css";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import EmptyState from "../EmptyState/EmptyState";
// import SearchBox from "../SearchBox/SearchBox";
// import NoteList from "../NoteList/NoteList";
// import Pagination from "../Pagination/Pagination";
// import Modal from "../Modal/Modal";
// import NoteForm from "../NoteForm/NoteForm";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchNotes,
//   createNote,
//   deleteNote,
//   type CreateNotePayload,
// } from "../../services/noteService";
// import { useDebounce } from "use-debounce";

// const App: React.FC = () => {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [debouncedSearch] = useDebounce(search, 500);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const queryClient = useQueryClient();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["notes", page, debouncedSearch],
//     queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
//   });

//   const mutationCreate = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       setIsModalOpen(false);
//     },
//   });

//   const mutationDelete = useMutation({
//     mutationFn: deleteNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//     },
//   });

//   const handleCreateNote = async (note: CreateNotePayload) => {
//     await mutationCreate.mutateAsync(note);
//   };

//   const handleDeleteNote = (id: string) => {
//     mutationDelete.mutate(id);
//   };

//   const notes = Array.isArray(data?.notes) ? data!.notes : [];
//   const totalPages = data?.totalPages ?? 0;

//   return (
//     <div className={css.app}>
//       {/* --- HEADER --- */}
//       <header className={css.header}>
//         <h1 className={css.title}>NoteHub</h1>
//         <SearchBox value={search} onChange={setSearch} />
//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           + Create note
//         </button>
//       </header>

//       {/* --- MAIN CONTENT --- */}
//       <main className={css.main}>
//         {isLoading && <Loader />}
//         {isError && <ErrorMessage message="Error loading notes" />}

//         {notes.length > 0 ? (
//           <NoteList notes={notes} onDelete={handleDeleteNote} />
//         ) : (
//           !isLoading && !isError && <EmptyState message="No notes found" />
//         )}
//       </main>

//       {/* --- FOOTER PAGINATION --- */}
//       <footer className={css.footer}>
//         {totalPages > 1 && (
//           <Pagination
//             page={page}
//             totalPages={totalPages}
//             onPageChange={setPage}
//           />
//         )}
//       </footer>

//       {/* --- MODAL --- */}
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm
//             onCreate={handleCreateNote}
//             onCancel={() => setIsModalOpen(false)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import css from "./App.module.css";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import EmptyState from "../EmptyState/EmptyState";
// import SearchBox from "../SearchBox/SearchBox";
// import NoteList from "../NoteList/NoteList";
// import Pagination from "../Pagination/Pagination";
// import Modal from "../Modal/Modal";
// import NoteForm from "../NoteForm/NoteForm";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchNotes,
//   createNote,
//   deleteNote,
//   type CreateNotePayload,
// } from "../../services/noteService";
// import { useDebounce } from "use-debounce";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// const App: React.FC = () => {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [debouncedSearch] = useDebounce(search, 500);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const queryClient = useQueryClient();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["notes", page, debouncedSearch],
//     queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
//     onError: () => {
//       iziToast.error({
//         title: "Error",
//         message: "Failed to load notes. Please try again.",
//         position: "topRight",
//       });
//     },
//   });

//   const mutationCreate = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       setIsModalOpen(false);
//       iziToast.success({
//         title: "Success",
//         message: "Note created successfully!",
//         position: "topRight",
//       });
//     },
//     onError: () => {
//       iziToast.error({
//         title: "Error",
//         message: "Failed to create note.",
//         position: "topRight",
//       });
//     },
//   });

//   const mutationDelete = useMutation({
//     mutationFn: deleteNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       iziToast.success({
//         title: "Deleted",
//         message: "Note deleted successfully!",
//         position: "topRight",
//       });
//     },
//     onError: () => {
//       iziToast.error({
//         title: "Error",
//         message: "Failed to delete note.",
//         position: "topRight",
//       });
//     },
//   });

//   const handleCreateNote = async (note: CreateNotePayload) => {
//     await mutationCreate.mutateAsync(note);
//   };

//   const handleDeleteNote = (id: string) => {
//     mutationDelete.mutate(id);
//   };

//   const notes = Array.isArray(data?.notes) ? data!.notes : [];
//   const totalPages = data?.totalPages ?? 0;

//   return (
//     <div className={css.app}>
//       {/* --- HEADER --- */}
//       <header className={css.header}>
//         <h1 className={css.title}>NoteHub</h1>
//         <SearchBox value={search} onChange={setSearch} />
//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           + Create note
//         </button>
//       </header>

//       {/* --- MAIN CONTENT --- */}
//       <main className={css.main}>
//         {isLoading && <Loader />}
//         {isError && !isLoading && (
//           <ErrorMessage message="Error loading notes" />
//         )}

//         {notes.length > 0 ? (
//           <NoteList notes={notes} onDelete={handleDeleteNote} />
//         ) : (
//           !isLoading && !isError && <EmptyState message="No notes found" />
//         )}
//       </main>

//       {/* --- FOOTER PAGINATION --- */}
//       <footer className={css.footer}>
//         {totalPages > 1 && (
//           <Pagination
//             page={page}
//             totalPages={totalPages}
//             onPageChange={setPage}
//           />
//         )}
//       </footer>

//       {/* --- MODAL --- */}
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm
//             onCreate={handleCreateNote}
//             onCancel={() => setIsModalOpen(false)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import css from "./App.module.css";
import Loader from "../Loader/Loader";
import Notification from "../Notification/Notification";
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
  const [notification, setNotification] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
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
    onError: () => setNotification("Error loading notes"),
  });

  const mutationCreate = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
      setNotification("Note created successfully");
    },
    onError: () => setNotification("Error creating note"),
  });

  const mutationDelete = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setNotification("Note deleted successfully");
    },
    onError: () => setNotification("Error deleting note"),
  });

  const handleCreateNote = async (note: CreateNotePayload) => {
    await mutationCreate.mutateAsync(note);
  };

  const handleDeleteNote = (id: string) => {
    mutationDelete.mutate(id);
  };

  const notes = Array.isArray(data?.notes) ? data!.notes : [];
  const totalPages = data?.totalPages ?? 0;

  // Автоматичне ховання Notification через 2.5с
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 2500);
    return () => clearTimeout(timer);
  }, [notification]);

  // Якщо пошук не дав результатів — показуємо Notification
  useEffect(() => {
    if (!isLoading && !isError && debouncedSearch && notes.length === 0) {
      setNotification("No notes found");
    }
  }, [isLoading, isError, notes.length, debouncedSearch]);

  return (
    <div className={css.app}>
      {/* HEADER */}
      <header className={css.header}>
        <h1 className={css.title}>NoteHub</h1>
        <SearchBox value={search} onChange={setSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          + Create note
        </button>
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
