import type { Note } from "@/types/note";

/**
 * PUBLIC_INTERFACE
 * A lightweight localStorage-based notes store for the frontend.
 * Persists all notes under a single key. Safe for browser-only usage.
 */
export class LocalStore {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  private read(): Note[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(this.key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  }

  private write(notes: Note[]) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(this.key, JSON.stringify(notes));
    } catch {
      // ignore quota or serialization errors
    }
  }

  // PUBLIC_INTERFACE
  /** Get all notes */
  getAll(): Note[] {
    return this.read();
  }

  // PUBLIC_INTERFACE
  /** Overwrite all notes */
  saveAll(notes: Note[]) {
    this.write(notes);
  }
}
