import { useState, useCallback } from "react";
import { useGameStore } from "./stores/gameStore";
import type { CharacterConfig } from "./types/game";
import { WelcomeScreen } from "./components/setup/WelcomeScreen";
import { ContentWarning } from "./components/setup/ContentWarning";
import { CharacterSetup } from "./components/setup/CharacterSetup";
import { ChatScreen } from "./components/chat/ChatScreen";
import { DebriefScreen } from "./components/debrief/DebriefScreen";
import { SOSButton } from "./components/ui/SOSButton";
import { getTotalChapters } from "./engine/GameEngine";

type Screen = "welcome" | "warning" | "setup" | "chat" | "debrief" | "end";

function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const {
    currentChapter,
    setConfig,
    startGame,
    loadSave,
    completeChapter,
    setCurrentChapter,
    clearMessages,
    resetGame,
  } = useGameStore();

  const handleNewGame = () => setScreen("warning");

  const handleContinue = () => {
    const loaded = loadSave();
    if (loaded) {
      setScreen("chat");
    }
  };

  const handleWarningAccepted = () => setScreen("setup");

  const handleCharacterComplete = (config: CharacterConfig) => {
    setConfig(config);
    startGame();
    setScreen("chat");
  };

  const handleChapterEnd = useCallback(() => {
    completeChapter(currentChapter);
    setScreen("debrief");
  }, [currentChapter, completeChapter]);

  const handleDebriefContinue = () => {
    const total = getTotalChapters();
    if (currentChapter >= total) {
      setScreen("end");
    } else {
      clearMessages();
      setCurrentChapter(currentChapter + 1);
      setScreen("chat");
    }
  };

  const handleEndRestart = () => {
    resetGame();
    setScreen("welcome");
  };

  return (
    <div className="h-full w-full relative">
      <SOSButton />

      {screen === "welcome" && (
        <WelcomeScreen onStart={handleNewGame} onContinue={handleContinue} />
      )}

      {screen === "warning" && (
        <ContentWarning onAccept={handleWarningAccepted} />
      )}

      {screen === "setup" && (
        <CharacterSetup onComplete={handleCharacterComplete} />
      )}

      {screen === "chat" && (
        <ChatScreen onChapterEnd={handleChapterEnd} />
      )}

      {screen === "debrief" && (
        <DebriefScreen
          chapter={currentChapter}
          onContinue={handleDebriefContinue}
          isFinalChapter={currentChapter >= getTotalChapters()}
        />
      )}

      {screen === "end" && (
        <div
          className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
          style={{ backgroundColor: "var(--color-bg-primary)" }}
        >
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            ECHO
          </h1>
          <p className="text-sm mb-2" style={{ color: "var(--color-text-primary)" }}>
            Merci d'avoir joué.
          </p>
          <p
            className="text-sm mb-8 max-w-xs leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Si ce jeu t'a touché(e), ou si tu reconnais des situations vécues,
            n'hésite pas à en parler. Le bouton SOS est toujours là.
          </p>
          <button
            onClick={handleEndRestart}
            className="py-3 px-8 rounded-xl font-semibold transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              color: "var(--color-text-primary)",
            }}
          >
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
