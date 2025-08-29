"use client";

import { useState } from "react";
import { FolderIcon, PlusIcon } from "@heroicons/react/24/outline";

type SidebarProps = {
  categories: string[];
  active: string;
  onChange: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export function Sidebar({
  categories,
  active,
  onChange,
  onCreateCategory,
}: SidebarProps) {
  const [newCat, setNewCat] = useState("");

  return (
    <aside className="border-t md:border-t-0 md:border-r border-[var(--color-border)] bg-[var(--color-muted)]/50">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wide mb-2">
          Categories
        </h2>
        <div className="flex gap-2 mb-3">
          <input
            className="input"
            placeholder="New category"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onCreateCategory(newCat);
                setNewCat("");
              }
            }}
          />
          <button
            className="btn btn-ghost"
            onClick={() => {
              onCreateCategory(newCat);
              setNewCat("");
            }}
            title="Add category"
          >
            <PlusIcon className="size-5" />
          </button>
        </div>
        <nav className="space-y-1">
          {categories.map((name) => {
            const isActive = name === active;
            return (
              <button
                key={name}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition ${
                  isActive
                    ? "bg-white border border-[var(--color-border)]"
                    : "hover:bg-white/60"
                }`}
                onClick={() => onChange(name)}
              >
                <FolderIcon className="size-5 text-[var(--color-secondary)]" />
                <span className="truncate">{name}</span>
                {isActive && (
                  <span className="badge ml-auto">Active</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
