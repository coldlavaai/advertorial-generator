import Image from "next/image";

export default function PoweredBy() {
  return (
    <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400 border-t border-cyan-500/10">
      <span className="font-mono text-xs uppercase tracking-wider">powered by</span>
      <span className="text-cyan-400 font-semibold tracking-wide">COLD LAVA</span>
    </div>
  );
}
