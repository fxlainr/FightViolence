import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed = 30, enabled = true) {
  const [displayedText, setDisplayedText] = useState(enabled ? "" : text);
  const [isComplete, setIsComplete] = useState(!enabled);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    setDisplayedText("");
    setIsComplete(false);
    indexRef.current = 0;

    const interval = setInterval(() => {
      indexRef.current++;
      if (indexRef.current >= text.length) {
        setDisplayedText(text);
        setIsComplete(true);
        clearInterval(interval);
      } else {
        setDisplayedText(text.slice(0, indexRef.current));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return { displayedText, isComplete };
}
