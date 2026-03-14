import { useGameStore } from "../../stores/gameStore";
import { StatusBar } from "../ui/StatusBar";

export function ChatHeader() {
  const { config, currentChapter } = useGameStore();
  const friendName = config?.friendName ?? "...";

  return (
    <div style={{ backgroundColor: "var(--color-bg-secondary)" }}>
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: "var(--color-accent)", color: "white" }}
        >
          {friendName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
            {friendName}
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            Chapitre {currentChapter} / 5
          </p>
        </div>
      </div>
      <StatusBar chapterNumber={currentChapter} />
    </div>
  );
}
