import { NAV_LINKS } from "@/data";
import type { Page } from "@/types";

interface NavLinksProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function NavLinks({ page, setPage }: NavLinksProps) {
  return (
    <ul className="flex gap-8 list-none m-0 p-0">
      {NAV_LINKS.map(link => (
        <li key={link.label}>
          <a
            href={page === "home" ? link.href : "#"}
            onClick={
              page !== "home"
                ? e => { e.preventDefault(); setPage("home"); window.scrollTo(0, 0); }
                : undefined
            }
            className="text-[11px] tracking-[0.15em] uppercase text-slate-400 no-underline transition-colors duration-200 hover:text-slate-100"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
