export class TimerManager {
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private startTime = 0;
  private duration = 0;
  private onTick: ((remaining: number) => void) | null = null;
  private rafId: number | null = null;

  start(
    seconds: number,
    onTick: (remaining: number) => void,
    onExpire: () => void
  ): void {
    this.stop();
    this.duration = seconds * 1000;
    this.startTime = Date.now();
    this.onTick = onTick;

    this.timerId = setTimeout(() => {
      this.stop();
      onExpire();
    }, this.duration);

    this.tick();
  }

  private tick = (): void => {
    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(0, this.duration - elapsed);
    this.onTick?.(remaining / 1000);
    if (remaining > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  };

  stop(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.onTick = null;
  }

  getRemainingSeconds(): number {
    if (!this.startTime) return 0;
    return Math.max(0, (this.duration - (Date.now() - this.startTime)) / 1000);
  }
}
