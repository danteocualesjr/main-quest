const STORAGE_PREFIX = "main-quest:";

export const SESSION_BACKUP_VERSION = 1;

export type SessionBackup = {
  version: number;
  exportedAt: string;
  entries: Record<string, string>;
};

function listPrefixedKeys(): string[] {
  if (typeof window === "undefined") return [];
  const keys: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      keys.push(key.slice(STORAGE_PREFIX.length));
    }
  }
  return keys;
}

export function buildSessionBackup(): SessionBackup {
  const entries: Record<string, string> = {};
  for (const suffix of listPrefixedKeys()) {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${suffix}`);
    if (raw != null) entries[suffix] = raw;
  }
  return {
    version: SESSION_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    entries,
  };
}

export function downloadSessionBackup(): void {
  const backup = buildSessionBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  anchor.href = url;
  anchor.download = `main-quest-backup-${date}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export type ImportBackupResult =
  | { ok: true; keyCount: number }
  | { ok: false; error: string };

function isSessionBackup(value: unknown): value is SessionBackup {
  if (!value || typeof value !== "object") return false;
  const record = value as SessionBackup;
  if (record.version !== SESSION_BACKUP_VERSION) return false;
  if (typeof record.exportedAt !== "string") return false;
  if (!record.entries || typeof record.entries !== "object") return false;
  for (const [key, raw] of Object.entries(record.entries)) {
    if (typeof key !== "string" || key.length === 0 || key.includes(":")) return false;
    if (typeof raw !== "string") return false;
    try {
      JSON.parse(raw);
    } catch {
      return false;
    }
  }
  return true;
}

export function importSessionBackupFromJson(json: string): ImportBackupResult {
  if (typeof window === "undefined") {
    return { ok: false, error: "Import is only available in the browser." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, error: "That file is not valid JSON." };
  }

  if (!isSessionBackup(parsed)) {
    return { ok: false, error: "Unrecognized backup format or version." };
  }

  if (Object.keys(parsed.entries).length === 0) {
    return { ok: false, error: "The backup file is empty." };
  }

  try {
    for (const [suffix, raw] of Object.entries(parsed.entries)) {
      window.localStorage.setItem(`${STORAGE_PREFIX}${suffix}`, raw);
    }
    return { ok: true, keyCount: Object.keys(parsed.entries).length };
  } catch {
    return { ok: false, error: "Could not save backup — storage may be full." };
  }
}
