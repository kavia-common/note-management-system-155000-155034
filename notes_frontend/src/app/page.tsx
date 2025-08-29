"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { NotesList } from "@/components/NotesList";
import { Editor } from "@/components/Editor";
import { createEmptyNote, filterNotes, generateId } from "@/lib/utils";
import { LocalStore } from "@/data/localStore";
import type { Note } from "@/types/note";

export default function Home() {
  const store = useMemo(() => new LocalStore("notes_v1"), []);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // load notes on mount
  useEffect(() => {
    const existing = store.getAll();
    setNotes(existing);
    if (existing.length > 0) setSelectedId(existing[0].id);
  }, [store]);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const visibleNotes = useMemo(() => {
    const qFiltered = filterNotes(notes, query);
    if (activeCategory === "All") return qFiltered;
    return qFiltered.filter((n) => n.category === activeCategory);
  }, [notes, query, activeCategory]);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    notes.forEach((n) => n.category && set.add(n.category));
    return Array.from(set);
  }, [notes]);

  const handleCreate = useCallback(() => {
    const id = generateId();
    const newNote = createEmptyNote(id);
    const next = [newNote, ...notes];
    setNotes(next);
    setSelectedId(id);
    store.saveAll(next);
  }, [notes, store]);

  const handleUpdate = useCallback(
    (updated: Note) => {
      setNotes((prev) => {
        const next = prev.map((n) => (n.id === updated.id ? updated : n));
        store.saveAll(next);
        return next;
      });
    },
    [store]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setNotes((prev) => {
        const next = prev.filter((n) => n.id !== id);
        store.saveAll(next);
        // adjust selection
        if (selectedId === id) {
          setSelectedId(next.length ? next[0].id : null);
        }
        return next;
      });
    },
    [selectedId, store]
  );

  const handleDuplicate = useCallback(() => {
    if (!selectedNote) return;
    const id = generateId();
    const copy: Note = {
      ...selectedNote,
      id,
      title: `${selectedNote.title} (copy)`,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    const next = [copy, ...notes];
    setNotes(next);
    setSelectedId(id);
    store.saveAll(next);
  }, [notes, selectedNote, store]);

  return (
    <main className="min-h-screen grid grid-rows-[auto_1fr]">
      <Header
        query={query}
        onQueryChange={setQuery}
        onCreate={handleCreate}
        onDuplicate={handleDuplicate}
        disableDuplicate={!selectedNote}
      />
      <div className="grid md:grid-cols-[260px_1fr] grid-cols-1">
        <Sidebar
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
          onCreateCategory={(name) => {
            if (!name.trim()) return;
            if (!categories.includes(name)) {
              // Category list is derived from notes; nothing to persist here.
              setActiveCategory(name);
            } else {
              setActiveCategory(name);
            }
          }}
        />
        <section className="grid lg:grid-cols-[360px_1fr] grid-cols-1 border-t md:border-t-0 md:border-l border-[var(--color-border)]">
          <NotesList
            notes={visibleNotes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onDelete={handleDelete}
            onCreate={handleCreate}
          />
          <Editor
            note={selectedNote}
            onChange={handleUpdate}
            onDelete={() => selectedId && handleDelete(selectedId)}
          />
        </section>
      </div>
    </main>
  );
}
