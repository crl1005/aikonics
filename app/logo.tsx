interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <a
      href="#"
      onClick={e => { e.preventDefault(); onClick?.(); }}
      className="flex flex-col no-underline text-slate-100"
    >
      <span className="text-2xl tracking-wide font-serif">Aikonics</span>
      <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400">Journey</span>
    </a>
  );
}