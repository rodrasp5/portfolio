import { useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import StatsStrip from "./StatsStrip";
import { site } from "../../data/site";
import { useLocalized } from "../../i18n/useLocalized";

const initials = site.name
  .split(" ")
  .map((n) => n[0])
  .join("")
  .slice(0, 2);

const photoSize = "h-44 w-44 rounded-full sm:h-56 sm:w-56 md:h-72 md:w-72";

export default function InfoSection() {
  const { t } = useTranslation();
  const { l } = useLocalized();
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <Section id="info" tone="light">
      <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between md:gap-16">
        <div className="text-center md:text-left">
          <p className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-slate-500">
            <span className="h-px w-8 bg-amber-500" aria-hidden="true" />
            {l(site.role)}
          </p>
          <h1 className="font-display mt-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            {l(site.bio)}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href="#projetos"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {t("nav.projects")}
            </a>
            <a
              href="#contactos"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium transition hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {t("nav.contacts")}
            </a>
          </div>
        </div>

        {photoFailed ? (
          <div
            className={`${photoSize} font-display flex shrink-0 items-center justify-center bg-slate-900 text-5xl font-bold text-white shadow-xl md:text-6xl`}
          >
            {initials}
          </div>
        ) : (
          <img
            src={site.photo}
            alt={site.name}
            onError={() => setPhotoFailed(true)}
            className={`${photoSize} shrink-0 border-4 border-slate-900 object-cover shadow-xl`}
          />
        )}
      </div>

      <StatsStrip />
    </Section>
  );
}
