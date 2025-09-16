import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes", {
    params,
    headers: { "Cache-Control": "no-cache" },
  });
  return data;
}

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const body: CreateNotePayload = {
    title: payload.title,
    tag: payload.tag,
    content: payload.content ?? "",
  };
  const { data } = await api.post<Note>("/notes", body);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}
