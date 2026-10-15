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
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("admin.title")}</h1>
        <button onClick={() => void logout()} className="text-sm underline">
          {t("admin.logout")}
        </button>
      </div>
      <p className="mt-2 text-sm text-slate-500">{session.user.email}</p>

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
