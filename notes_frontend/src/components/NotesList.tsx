"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import type { Note } from "@/types/note";

type NotesListProps = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
};

export function NotesList({
  notes,
  selectedId,
  onSelect,
  onDelete,
  onCreate,
}: NotesListProps) {
  return (
    <div className="border-b lg:border-b-0 lg:border-r border-[var(--color-border)] min-h-[40vh] lg:min-h-0">
      <div className="p-4 flex items-center justify-between">
        <div className="text-sm text-[var(--color-secondary)]">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </div>
        <button className="btn btn-ghost" onClick={onCreate}>New</button>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-10rem)] lg:max-h-[calc(100vh-5.5rem)]">
        <ul className="p-2">
          {notes.map((n) => {
            const active = n.id === selectedId;
            return (
              <li key={n.id}>
                <button
                  onClick={() => onSelect(n.id)}
                  className={`w-full text-left p-3 rounded-lg border transition flex gap-3 group ${
                    active
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                      : "border-[var(--color-border)] hover:bg-[var(--color-muted)]"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{n.title || "Untitled"}</h3>
                      {n.category && (
                        <span className="badge">{n.category}</span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-secondary)] line-clamp-2">
                      {n.content || "No content yet."}
                    </p>
                    <p className="text-xs text-[var(--color-secondary)] mt-1">
                      {formatUpdated(n.updatedAt)}
                    </p>
                  </div>
                  <button
                    className="btn btn-ghost opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(n.id);
                    }}
                    title="Delete note"
                  >
                    <TrashIcon className="size-5 text-red-500" />
                  </button>
                </button>
              </li>
            );
          })}
          {notes.length === 0 && (
            <li className="px-3 py-6 text-center text-[var(--color-secondary)]">
              No notes match. Create a new one?
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function formatUpdated(iso?: string) {
  if (!iso) return "";
  const dt = new Date(iso);
  return `Updated ${dt.toLocaleString()}`;
}
