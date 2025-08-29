"use client";

import { MagnifyingGlassIcon, PlusIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useId } from "react";

type HeaderProps = {
  query: string;
  onQueryChange: (v: string) => void;
  onCreate: () => void;
  onDuplicate: () => void;
  disableDuplicate?: boolean;
};

export function Header({
  query,
  onQueryChange,
  onCreate,
  onDuplicate,
  disableDuplicate,
}: HeaderProps) {
  const searchId = useId();

  return (
    <header className="sticky top-0 z-10 bg-[var(--color-bg)]/80 backdrop-blur border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">N</div>
          <h1 className="text-lg font-semibold tracking-tight">Notes</h1>
        </div>
        <div className="flex-1" />
        <div className="relative max-w-md w-full hidden md:block">
          <label htmlFor={searchId} className="sr-only">Search notes</label>
          <input
            id={searchId}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="input pl-10"
            placeholder="Search notes by title or content..."
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[var(--color-secondary)]" />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onCreate} className="btn btn-accent" title="New note">
            <PlusIcon className="size-5" />
            <span className="hidden sm:inline">New</span>
          </button>
          <button
            onClick={onDuplicate}
            className="btn btn-ghost"
            title="Duplicate selected"
            disabled={disableDuplicate}
            aria-disabled={disableDuplicate}
            style={disableDuplicate ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
          >
            <SquaresPlusIcon className="size-5" />
            <span className="hidden sm:inline">Duplicate</span>
          </button>
        </div>
      </div>
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[var(--color-secondary)]" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="input pl-10"
            placeholder="Search notes..."
            aria-label="Search notes"
          />
        </div>
      </div>
    </header>
  );
}
