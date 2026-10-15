import { useEffect, useState, type ReactNode } from "react";
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

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase
      .from("projects")
      .select("*")
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        if (!alive) return;
        if (error)
          console.warn("Projetos: a usar dados locais.", error.message);
        else setProjects(data as Project[]);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
}
