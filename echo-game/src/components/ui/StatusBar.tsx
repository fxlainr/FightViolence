interface Props {
  chapterNumber: number;
}

export function StatusBar({ chapterNumber }: Props) {
  return (
    <div
      className="flex items-center justify-center gap-2 py-2"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      {[1, 2, 3, 4, 5].map((ch) => (
        <div
          key={ch}
          className="w-8 h-1 rounded-full transition-colors"
          style={{
            backgroundColor: ch <= chapterNumber
              ? "var(--color-accent)"
              : "var(--color-bg-chat)",
          }}
        />
      ))}
    </div>
  );
}
