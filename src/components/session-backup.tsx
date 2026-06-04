"use client";

import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import { QuestButton } from "@/components/quest-button";
import {
  downloadSessionBackup,
  importSessionBackupFromJson,
} from "@/lib/session-backup";

export function SessionBackup() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleExport() {
    setError(null);
    setStatus(null);
    try {
      downloadSessionBackup();
      setStatus("Backup downloaded. Keep the file private — it includes your answers.");
    } catch {
      setError("Could not create backup file.");
    }
  }

  async function handleImport(file: File | undefined) {
    setError(null);
    setStatus(null);
    if (!file) return;

    try {
      const json = await file.text();
      const result = importSessionBackupFromJson(json);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setStatus(
        `Restored ${result.keyCount} saved item${result.keyCount === 1 ? "" : "s"}. Refresh the page to see your progress.`
      );
    } catch {
      setError("Could not read that file.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="journey-rail relative p-5">
      <p className="label-accent relative">Move progress to another device</p>
      <p className="relative mt-3 text-sm leading-relaxed text-smoke">
        Export a private backup of your quiz answers, roadmaps, and coach chats. Import it
        on another browser — no account required.
      </p>
      <div className="relative mt-5 flex flex-wrap gap-2">
        <QuestButton type="button" variant="ghost" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Download backup
        </QuestButton>
        <QuestButton
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          Import backup
        </QuestButton>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          onChange={(e) => void handleImport(e.target.files?.[0])}
        />
      </div>
      {status && (
        <p className="mt-3 text-xs text-moss" role="status">
          {status}
        </p>
      )}
      {error && (
        <p className="mt-3 text-xs text-tomato" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
