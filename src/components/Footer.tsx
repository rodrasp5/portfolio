import { useTranslation } from "react-i18next";
import { site } from "../data/site";
import ContactLinks from "./ContactLinks";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      id="contactos"
      data-tone="dark"
      className="scroll-mt-16 bg-black px-4 py-12 text-slate-300 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-600">
              {t("footer.title")}
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-slate-200 sm:text-3xl">
              {t("footer.cta")}
            </h2>
            <a
              href={`mailto:${site.contacts.email}`}
              className="mt-4 inline-block text-base text-slate-400 underline decoration-slate-700 underline-offset-8 transition hover:text-slate-200 hover:decoration-amber-600"
            >
              {site.contacts.email}
            </a>
          </div>

          <ContactLinks
            withEmail={false}
            showLabels
            size={18}
            className="flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:items-start md:gap-3"
            linkClassName="text-sm text-slate-400 transition hover:text-slate-200"
          />
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-slate-800/80 pt-5 text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition hover:text-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            ↑ {t("nav.home")}
          </button>
        </div>
      </div>
    </footer>
  );
}
