export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content?: string | null;
  tag?: NoteTag;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
