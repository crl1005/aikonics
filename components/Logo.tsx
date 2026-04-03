interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    
      href="#"
      onClick={e => { e.preventDefault(); onClick?.(); }}
      className="flex flex-col no-underline text-slate-100"
    >
      <span className="text-3xl tracking-wide font-serif">Aikonics</span>
      <span className="text-[11px] tracking-[0.25em] uppercase text-slate-400">Journey</span>
    </a>
  );
}