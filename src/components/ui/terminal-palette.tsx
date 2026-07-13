"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  execCatAbout,
  execGrep,
  execLsProjects,
  execWhoami,
} from "@/app/actions/terminal";

type HistoryEntry = {
  id: string;
  command: string;
  output: React.ReactNode;
  isError?: boolean;
};

const HELP_OUTPUT = (
  <div className="grid grid-cols-[130px_1fr] gap-2">
    <span className="text-flame">whoami</span>
    <span>Identity & status</span>
    <span className="text-flame">cat about.txt</span>
    <span>View bio</span>
    <span className="text-flame">ls projects/</span>
    <span>List flagship projects</span>
    <span className="text-flame">grep &lt;term&gt;</span>
    <span>Search projects and skills</span>
    <span className="text-flame">go &lt;page&gt;</span>
    <span>Navigate (about, projects, contact)</span>
    <span className="text-flame">theme &lt;ice|fire&gt;</span>
    <span>Shift ambient site temperature</span>
    <span className="text-flame">status</span>
    <span>System telemetry</span>
    <span className="text-flame">clear</span>
    <span>Clear terminal</span>
  </div>
);

const TELEMETRY_OUTPUT = (
  <div className="text-mist">
    <p className="text-faint uppercase text-[10px] mb-2">
      [demo mode — illustrative system telemetry]
    </p>
    <p>Core Threads: 16/16</p>
    <p>Memory Cache: 1.2GB/8GB</p>
    <p>Thermal State: Stable (21°C)</p>
    <p>LSM Compaction: Idle</p>
  </div>
);

const focusTrap = (e: ReactKeyboardEvent) => {
  if (e.key === "Tab") {
    e.preventDefault(); // Trap focus within terminal modal
  }
};

export function TerminalPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);
  const isClosingRef = useRef(isClosing);

  const router = useRouter();
  const pathname = usePathname();

  const closeTerminal = () => {
    if (isClosingRef.current || !isOpenRef.current) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 240);
  };

  // Keep ref in sync for event listeners without rebinding
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    isClosingRef.current = isClosing;
  }, [isClosing]);

  // Close on route change (instant, no animation needed)
  // biome-ignore lint/correctness/useExhaustiveDependencies: we explicitly want to run this when pathname changes
  useEffect(() => {
    setIsOpen(false);
    setIsClosing(false);
  }, [pathname]);

  // Global Keyboard Shortcut (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault(); // Prevents Chrome/Edge address bar focus
        if (isOpenRef.current) {
          closeTerminal();
        } else {
          setIsOpen(true);
          setIsBooting(true);
        }
      }

      // Escape to close
      if (e.key === "Escape" && isOpenRef.current) {
        closeTerminal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeTerminal]);

  // Auto-focus and lock scroll
  useEffect(() => {
    if (isOpen && !isClosing) {
      document.documentElement.style.overflow = "hidden";
      if (isBooting) {
        const timer = setTimeout(() => {
          setIsBooting(false);
          inputRef.current?.focus();
        }, 400);
        return () => clearTimeout(timer);
      } else {
        inputRef.current?.focus();
      }
    } else if (!isOpen) {
      document.documentElement.style.overflow = "";
    }
  }, [isOpen, isBooting, isClosing]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run when history or boot state changes
  useEffect(() => {
    // Scroll to bottom when history changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isBooting]);

  const handleCommand = async (cmdString: string) => {
    const cmd = cmdString.trim();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");

    const addEntry = (output: React.ReactNode, isError = false) => {
      setHistory((prev) => [
        ...prev,
        { id: crypto.randomUUID(), command: cmd, output, isError },
      ]);
    };

    const parts = cmd.split(" ").filter(Boolean);
    const base = parts[0].toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (base === "go") {
      const target = parts[1];
      if (["about", "resume", "projects", "contact"].includes(target)) {
        addEntry(`Navigating to /${target}...`);
        router.push(`/${target}`);
        closeTerminal();
        return;
      } else if (target === "home" || target === "/") {
        addEntry(`Navigating to /...`);
        router.push(`/`);
        closeTerminal();
        return;
      }
      addEntry(`bash: go: unknown route '${target}'`, true);
      return;
    }

    if (base === "whoami") {
      const res = await execWhoami();
      addEntry(res);
      return;
    }

    if (base === "ls" && parts[1] === "projects/") {
      const res = await execLsProjects();
      addEntry(res);
      return;
    }

    if (cmd === "cat about.txt") {
      const res = await execCatAbout();
      addEntry(res);
      return;
    }

    if (base === "grep") {
      const term = parts.slice(1).join(" ");
      const res = await execGrep(term);
      if (!res) {
        addEntry(""); // no hits
      } else {
        // Highlight terms
        const lines = res.split("\n").map((line, i) => {
          const regex = new RegExp(`(${term})`, "gi");
          const chunks = line.split(regex);
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: static string highlight
            <div key={i}>
              {chunks.map((chunk, j) =>
                chunk.toLowerCase() === term.toLowerCase() ? (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static string highlight
                  <span key={j} className="text-ember font-bold">
                    {chunk}
                  </span>
                ) : (
                  chunk
                ),
              )}
            </div>
          );
        });
        addEntry(<div className="flex flex-col">{lines}</div>);
      }
      return;
    }

    if (base === "temp" || base === "status") {
      addEntry(TELEMETRY_OUTPUT);
      return;
    }

    if (cmd === "sudo hire ankit") {
      addEntry("bash: permission denied: are you root?");
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            command: "",
            output: "... just kidding, opening channel",
            isError: false,
          },
        ]);
        router.push("/contact");
        closeTerminal();
      }, 800);
      return;
    }

    if (cmd === "theme ice") {
      document.documentElement.classList.remove("theme-fire");
      document.documentElement.classList.add("theme-ice");
      addEntry("Ambient thermal state biased to ICE.");
      return;
    }

    if (cmd === "theme fire") {
      document.documentElement.classList.remove("theme-ice");
      document.documentElement.classList.add("theme-fire");
      addEntry("Ambient thermal state biased to FIRE.");
      return;
    }

    if (cmd === "cast") {
      addEntry("Casting shockwave...");
      const ev = new CustomEvent("thermal-cast", { detail: "fire" });
      document.dispatchEvent(ev);
      return;
    }

    if (base === "help") {
      addEntry(HELP_OUTPUT);
      return;
    }

    addEntry(`bash: ${base}: command not found`, true);
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmd = input.toLowerCase();
      if ("projects".startsWith(cmd) || "pro".startsWith(cmd))
        setInput("ls projects/");
      else if ("whoami".startsWith(cmd) && cmd.length > 0) setInput("whoami");
      else if ("clear".startsWith(cmd) && cmd.length > 0) setInput("clear");
      else if ("status".startsWith(cmd) && cmd.length > 0) setInput("status");
      else if ("about".startsWith(cmd) || "cat".startsWith(cmd))
        setInput("cat about.txt");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setIsBooting(true);
        }}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-abyss/80 text-mist shadow-lg backdrop-blur transition-all hover:scale-105 hover:border-ice/40 hover:text-polar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember group"
        aria-label="Open Terminal Palette"
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <span className="font-mono text-lg font-bold group-hover:text-ember transition-colors">
          _
        </span>
        <span className="absolute right-0 top-0 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75 motion-reduce:animate-none"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-ember/80"></span>
        </span>
      </button>

      {isOpen ? (
        // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click
        // biome-ignore lint/a11y/noStaticElementInteractions: backdrop click
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-void/40 backdrop-blur-md modal-backdrop ${isClosing ? "modal-closing" : ""}`}
          onClick={closeTerminal}
        >
          {/* biome-ignore lint/a11y/noStaticElementInteractions: dialog container */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: dialog container */}
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-line/70 bg-abyss/90 shadow-2xl matrix-card modal-panel"
            style={{ height: "min(600px, 90dvh)" }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={focusTrap}
          >
            <div className="flex items-center justify-between border-b border-line/50 bg-void/50 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-line/60" />
                <div className="h-3 w-3 rounded-full bg-line/60" />
                <div className="h-3 w-3 rounded-full bg-line/60" />
              </div>
              <span className="font-mono text-xs text-faint">
                ~/origin/terminal
              </span>
            </div>

            <div
              ref={scrollRef}
              className="flex h-[calc(100%-85px)] flex-col overflow-y-auto p-4 font-mono text-sm text-polar/90"
              aria-live="polite"
            >
              {isBooting ? (
                <div className="animate-pulse text-mist/70 motion-reduce:animate-none">
                  Initializing thermal shell...
                </div>
              ) : (
                <>
                  <div className="mb-4 text-mist">
                    Welcome to Origin Shell v1.0. Type{" "}
                    <span className="text-flame">help</span> for commands.
                  </div>

                  {history.map((entry) => (
                    <div key={entry.id} className="mb-4">
                      <div className="flex gap-2">
                        <span className="text-flame">$</span>
                        <span>{entry.command}</span>
                      </div>
                      <div
                        className={`mt-1 whitespace-pre-wrap ${entry.isError ? "text-red-400" : "text-mist"}`}
                      >
                        {entry.output}
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <span className="text-flame">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent text-polar outline-none caret-ember motion-reduce:caret-ice"
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-center border-t border-line/50 bg-void/50 px-4 py-2 font-mono text-[10px] text-faint">
              ↑↓ history · Tab complete · Esc close
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
