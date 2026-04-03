import { NAV_LINKS } from "@/data";
import type { Page } from "@/types";

interface NavLinksProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function NavLinks({ page, setPage }: NavLinksProps) {
  return (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-8 list-none m-0 p-0 mt-4 md:mt-0">
      {NAV_LINKS.map(link => (
        <li key={link.label}>
          <a href={page === "home" ? link.href : "#"} className="text-[11px] tracking-[0.15em] uppercase text-slate-400 no-underline transition-colors duration-200 hover:text-slate-100">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}