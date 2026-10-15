import { useCallback, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { projects as fallback } from "../data/projects";
import type { Project } from "../data/types";
import { ProjectsContext } from "../lib/projectsContext";

export default function ProjectsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [projects, setProjects] = useState<Project[]>(fallback);
  const [loading, setLoading] = useState(Boolean(supabase));

  const refresh = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("date", { ascending: false });
    if (error) console.warn("Projetos: a usar dados locais.", error.message);
    else setProjects(data as Project[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <ProjectsContext.Provider value={{ projects, loading, refresh }}>
      {children}
    </ProjectsContext.Provider>
  );
}
