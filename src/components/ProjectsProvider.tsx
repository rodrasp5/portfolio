import { useCallback, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { projects as fallback } from "../data/projects";
import type { Project } from "../data/types";
import { ProjectsContext } from "../lib/projectsContext";

// Devolve os projetos do Supabase, ou null se falhar (aí usa-se a reserva local)
async function fetchProjects(): Promise<Project[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("date", { ascending: false });
  if (error) {
    console.warn("Projetos: a usar dados locais.", error.message);
    return null;
  }
  return data as Project[];
}

export default function ProjectsProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Com Supabase, começa vazio até a resposta chegar; sem Supabase, usa a reserva
  const [projects, setProjects] = useState<Project[]>(supabase ? [] : fallback);
  const [loading, setLoading] = useState(Boolean(supabase));

  // Usado pelo painel de administração depois de guardar ou apagar
  const refresh = useCallback(async () => {
    const data = await fetchProjects();
    if (data) setProjects(data);
    setLoading(false);
  }, []);

  // Carga inicial
  useEffect(() => {
    let alive = true;
    void fetchProjects().then((data) => {
      if (!alive) return;
      setProjects(data ?? fallback);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading, refresh }}>
      {children}
    </ProjectsContext.Provider>
  );
}
