import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";
import LoginIcon from "./LoginIcon";
import { site } from "../data/site";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-slate-200 bg-white/90 text-slate-900 backdrop-blur">
      <nav className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            aria-label={t("nav.login")}
            title={t("nav.login")}
            className="rounded p-1 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <LoginIcon />
          </Link>
          <Link to="/" className="hidden font-bold sm:block">
            {site.name}
          </Link>
        </div>

        <ul className="flex items-center gap-3 text-sm sm:gap-6">
          <li>
            <Link to="/" className="hover:underline">
              {t("nav.home")}
            </Link>
          </li>
          <li>
            <a href="#contactos" className="hover:underline">
              {t("nav.contacts")}
            </a>
          </li>
          <li>
            <a href="/#projetos" className="hover:underline">
              {t("nav.projects")}
            </a>
          </li>
          <li>
            <LanguageSwitch />
          </li>
        </ul>
      </nav>
    </header>
  );
}
