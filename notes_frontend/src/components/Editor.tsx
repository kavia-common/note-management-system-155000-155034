"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Note } from "@/types/note";
import { debounce } from "@/lib/utils";
import { TrashIcon } from "@heroicons/react/24/outline";

type EditorProps = {
  note: Note | null;
  onChange: (note: Note) => void;
  onDelete: () => void;
};

export function Editor({ note, onChange, onDelete }: EditorProps) {
  const [local, setLocal] = useState<Note | null>(note);
  const debounced = useMemo(() => debounce((n: Note) => onChange(n), 300), [onChange]);
  const mounted = useRef(false);

  useEffect(() => {
    setLocal(note);
  }, [note]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (local && local.id) {
      debounced({ ...local, updatedAt: new Date().toISOString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local?.title, local?.content, local?.category]);

  if (!local) {
    return (
      <div className="p-6">
        <div className="card p-8 text-center">
          <p className="text-[var(--color-secondary)]">Select or create a note to start editing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center gap-2 mb-3">
        <input
          className="input text-xl font-semibold"
          placeholder="Untitled"
          value={local.title}
          onChange={(e) => setLocal({ ...local, title: e.target.value })}
        />
        <div className="flex-1" />
        <button
          className="btn btn-ghost"
          onClick={() => {
            if (confirm("Delete this note?")) onDelete();
          }}
          title="Delete note"
        >
          <TrashIcon className="size-5 text-red-500" />
        </button>
      </div>
      <div className="mb-3">
        <input
          className="input"
          placeholder="Category (optional)"
          value={local.category ?? ""}
          onChange={(e) => setLocal({ ...local, category: e.target.value })}
        />
      </div>
      <div className="card">
        <textarea
          className="w-full p-4 min-h-[45vh] lg:min-h-[60vh] resize-vertical rounded-[0.75rem] outline-none"
          placeholder="Write your note here..."
          value={local.content}
          onChange={(e) => setLocal({ ...local, content: e.target.value })}
        />
      </div>
    </div>
  );
}
