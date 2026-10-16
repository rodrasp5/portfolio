import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import type { Session } from "@supabase/supabase-js";
import type { Project } from "../../data/types";
import { removeProjectImages } from "../../lib/images";
import { supabase } from "../../lib/supabase";
import { useProjects } from "../../lib/projectsContext";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

// null = lista, 'new' = novo projeto, Project = a editar
type Editing = null | "new" | Project;

export default function RealAdmin({ session }: { session: Session }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projects, refresh } = useProjects();
  const [editing, setEditing] = useState<Editing>(null);

  async function logout() {
    // Navega primeiro: ao terminar a sessão, esta página redirecionava para o login
    navigate("/");
    await supabase?.auth.signOut();
  }

  async function remove(project: Project) {
    if (!supabase || !window.confirm(t("admin.confirmDelete"))) return;
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("slug", project.slug);
    if (error) {
      window.alert(error.message);
      return;
    }
    await removeProjectImages(project.gallery.map((b) => b.image));
    await refresh();
  }

  async function saved() {
    await refresh();
    setEditing(null);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {t("admin.title")}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{session.user.email}</p>
        </div>
        <button
          onClick={() => void logout()}
          className="rounded-full border border-slate-200 px-4 py-1.5 text-sm transition hover:border-slate-900"
        >
          {t("admin.logout")}
        </button>
      </div>

      {editing === null ? (
        <ProjectList
          projects={projects}
          onNew={() => setEditing("new")}
          onEdit={setEditing}
          onDelete={(p: Project) => void remove(p)}
        />
      ) : (
        <ProjectForm
          key={editing === "new" ? "new" : editing.slug}
          project={editing === "new" ? undefined : editing}
          onSaved={saved}
          onCancel={() => setEditing(null)}
        />
      )}
    </main>
  );
}
