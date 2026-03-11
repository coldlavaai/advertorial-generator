export default function PoweredBy() {
  return (
    <div
      className="flex items-center justify-center gap-2.5 py-5"
      style={{ borderTop: '1px solid rgba(6,182,212,0.06)' }}
    >
      <span
        className="font-mono text-[0.6rem] tracking-[0.15em] uppercase"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        Powered by
      </span>
      <span
        className="font-mono text-[0.7rem] font-bold tracking-[0.1em]"
        style={{ color: 'rgba(6,182,212,0.6)' }}
      >
        COLD LAVA
      </span>
    </div>
  );
}
