import React from "react";
import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div className={css.cardInner}>
            {/* Передня сторона */}
            <div className={css.cardFront}>
              <h2 className={css.title}>{note.title}</h2>
            </div>

            {/* Задня сторона */}
            <div className={css.cardBack}>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                {note.tag && <span className={css.tag}>{note.tag}</span>}
                <button
                  className={css.button}
                  onClick={() => onDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
