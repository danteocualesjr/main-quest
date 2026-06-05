"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { Loader2, MessageCircleMore, RotateCcw, Send, X } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isTextUIPart } from "ai";
import type { CoachContext, CoachMessage } from "@/lib/coach/types";
import {
  clearCoachConversation,
  coachStorageKey,
  loadCoachConversation,
  saveCoachConversation,
} from "@/lib/coach/conversation-storage";

interface CoachPanelProps {
  context: CoachContext;
}

const DISCOVER_STARTER_PROMPTS = [
  "Why these matches?",
  "What if I'm not strong at math?",
  "Show me something more creative",
  "Which of these has the shortest path?",
];

const PATH_STARTER_PROMPTS = [
  "Walk me through phase 1",
  "What if this timeline feels too long?",
  "Are there similar careers with a shorter path?",
  "What's the hardest part of this roadmap?",
];

export function CoachPanel({ context }: CoachPanelProps) {
  const storageKey = useMemo(() => coachStorageKey(context), [context]);
  const starterPrompts =
    context.mode === "path" ? PATH_STARTER_PROMPTS : DISCOVER_STARTER_PROMPTS;
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState<CoachMessage[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadCoachConversation(storageKey).then((messages) => {
      if (!cancelled) setHydrated(messages);
    });
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="coach-launcher group mt-12 flex w-full items-start gap-5 active:scale-[0.995]"
        aria-expanded={false}
        aria-controls="coach-panel"
      >
        <span
          aria-hidden
          className="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper text-tomato shadow-paper transition group-hover:border-tomato group-hover:shadow-soft"
        >
          <MessageCircleMore className="h-5 w-5" />
        </span>
        <span className="relative z-[1] flex-1">
          <span className="label-accent">Talk it through</span>
          <span className="mt-2 block font-display text-2xl font-light tracking-tight text-ink md:text-3xl">
            {context.mode === "path" ? (
              <>
                Want to <em className="italic text-tomato">stress-test</em> this roadmap?
              </>
            ) : (
              <>
                Want to <em className="italic text-tomato">dig deeper</em> into these?
              </>
            )}
          </span>
          <span className="mt-2 block max-w-xl text-[15px] leading-relaxed text-graphite">
            {context.mode === "path"
              ? "Ask follow-ups about any phase. A coach can compare alternatives, tighten the timeline, or help you decide if this goal still fits."
              : "Ask follow-ups about any match. A coach can compare paths, walk through a roadmap, or suggest new directions if none of these feel right."}
          </span>
        </span>
        <span
          aria-hidden
          className="relative z-[1] hidden self-center font-mono text-xs uppercase tabular tracking-widest text-smoke transition group-hover:text-tomato md:block"
        >
          Open
        </span>
      </button>
    );
  }

  if (hydrated === null) {
    return (
      <div className="mt-12 border border-ink/15 bg-cream p-8" aria-busy>
        <div className="skeleton h-3 w-32 rounded" />
        <div className="skeleton mt-4 h-6 w-3/5 rounded" />
        <div className="skeleton mt-2 h-3 w-4/5 rounded" />
      </div>
    );
  }

  return (
    <CoachChat
      key={storageKey}
      storageKey={storageKey}
      initialMessages={hydrated}
      context={context}
      starterPrompts={starterPrompts}
      onClose={() => setOpen(false)}
    />
  );
}

interface CoachChatProps {
  storageKey: string;
  initialMessages: CoachMessage[];
  context: CoachContext;
  starterPrompts: string[];
  onClose: () => void;
}

function CoachChat({
  storageKey,
  initialMessages,
  context,
  starterPrompts,
  onClose,
}: CoachChatProps) {
  const contextRef = useRef(context);
  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/coach",
        body: () => ({ context: contextRef.current }),
      }),
    []
  );

  const { messages, sendMessage, status, error, stop, regenerate, setMessages, clearError } =
    useChat({
      transport,
      messages: initialMessages,
    });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isBusy = status === "submitted" || status === "streaming";
  const hasMessages = messages.length > 0;
  const coachUnavailable =
    error?.message?.toLowerCase().includes("api key") ||
    error?.message?.includes("503") ||
    error?.message?.toLowerCase().includes("unavailable");

  useEffect(() => {
    if (messages.length === 0) return;
    saveCoachConversation(storageKey, messages);
  }, [messages, storageKey]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    clearError();
    sendMessage({ text: trimmed });
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send(input);
    }
  }

  function handleClear() {
    clearError();
    stop();
    setMessages([]);
    clearCoachConversation(storageKey);
  }

  return (
    <section
      id="coach-panel"
      className="mt-12 overflow-hidden rounded-2xl border border-ink/15 bg-cream shadow-soft animate-fade-up"
      aria-label="Career coach"
      aria-busy={isBusy}
    >
      <header className="flex items-center justify-between gap-3 border-b border-ink/10 bg-paper/60 px-6 py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-cream text-tomato"
          >
            <MessageCircleMore className="h-4 w-4" />
          </span>
          <div>
            <p className="label-accent">Career coach</p>
            <p className="mt-0.5 text-sm text-graphite">
              Asks follow-ups, compares paths, suggests new directions.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {hasMessages && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-smoke transition hover:text-tomato"
              aria-label="Clear conversation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-smoke transition hover:bg-ink/5 hover:text-tomato"
            aria-label="Close coach"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="max-h-[28rem] min-h-[16rem] overflow-y-auto px-6 py-6"
        aria-live="polite"
        aria-relevant="additions"
      >
        {!hasMessages && (
          <div className="space-y-5">
            <p className="text-[15px] leading-relaxed text-graphite">
              {context.mode === "path"
                ? "Ask anything about this roadmap, or pick a starter:"
                : "Ask anything about your matches, or pick a starter:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => send(prompt)}
                  disabled={isBusy}
                  className="prompt-chip disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasMessages && (
          <ul className="space-y-6">
            {messages.map((message) => (
              <li key={message.id}>
                <MessageBubble message={message} />
              </li>
            ))}
            {status === "submitted" && (
              <li aria-hidden>
                <div className="flex items-center gap-2 text-smoke">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="text-sm">Thinking…</span>
                </div>
              </li>
            )}
          </ul>
        )}

        {error && (
          <div className="mt-6 border-l-2 border-tomato bg-tomato/5 px-4 py-3 text-sm text-tomato">
            <p className="font-medium">
              {coachUnavailable ? "Coach is offline right now." : "Something went wrong."}
            </p>
            <p className="mt-1 text-graphite">
              {coachUnavailable
                ? "The rest of Main Quest still works without an AI key. You can keep browsing careers or build a roadmap from the static catalog."
                : error.message || "The coach couldn't reply just now."}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => regenerate()}
                className="underline-link text-tomato"
              >
                Try again
              </button>
              {coachUnavailable && (
                <>
                  <Link href="/explore" className="underline-link text-ink">
                    Browse careers
                  </Link>
                  <Link href="/path" className="underline-link text-ink">
                    Build a roadmap
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 border-t border-ink/10 bg-paper/60 px-4 py-3"
      >
        <textarea
          className="input-block min-h-[44px] flex-1 resize-none py-2.5 text-[15px]"
          placeholder="Ask the coach…"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isBusy && status === "submitted"}
          aria-label="Message the career coach"
        />
        {isBusy ? (
          <button
            type="button"
            onClick={() => stop()}
            className="inline-flex h-11 items-center gap-2 border border-ink/15 bg-cream px-4 text-sm font-medium text-ink transition hover:border-tomato hover:text-tomato"
          >
            <X className="h-4 w-4" />
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="inline-flex h-11 items-center gap-2 border border-ink bg-ink px-4 text-sm font-medium text-paper transition hover:bg-tomato hover:border-tomato disabled:opacity-40 disabled:hover:bg-ink disabled:hover:border-ink"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        )}
      </form>
    </section>
  );
}

function MessageBubble({ message }: { message: CoachMessage }) {
  const isUser = message.role === "user";
  const textParts = message.parts.filter(isTextUIPart);
  const hasToolActivity = message.parts.some(
    (p) => p.type !== "text" && p.type !== "step-start"
  );

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-2.5 text-[15px] leading-relaxed text-paper shadow-soft"
            : "coach-bubble-assistant"
        }
      >
        {!isUser && (
          <span className="label-accent mb-1.5 block">Coach</span>
        )}
        {textParts.length > 0 ? (
          textParts.map((part, i) => (
            <p key={i} className={i > 0 ? "mt-3 whitespace-pre-wrap" : "whitespace-pre-wrap"}>
              {part.text}
            </p>
          ))
        ) : hasToolActivity && !isUser ? (
          <p className="inline-flex items-center gap-2 text-smoke">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Looking that up in the catalog…</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
