import { useState, useEffect, useRef, useCallback } from "react";

export function useTimer() {
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const onExpireRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const durationRef = useRef(0);

  const tick = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const rem = Math.max(0, durationRef.current - elapsed) / 1000;
    setRemaining(rem);
    if (rem > 0) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const start = useCallback((seconds: number, onExpire: () => void) => {
    stop();
    setTotalSeconds(seconds);
    setRemaining(seconds);
    setIsRunning(true);
    startTimeRef.current = Date.now();
    durationRef.current = seconds * 1000;
    onExpireRef.current = onExpire;

    timerRef.current = setTimeout(() => {
      setIsRunning(false);
      setRemaining(0);
      onExpire();
    }, seconds * 1000);

    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsRunning(false);
    onExpireRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { remaining, isRunning, totalSeconds, start, stop };
}
