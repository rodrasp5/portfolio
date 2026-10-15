import { createContext, useContext } from "react";
import type { Project } from "../data/types";

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
}

export const ProjectsContext = createContext<ProjectsState>({
  projects: [],
  loading: false,
});

export const useProjects = () => useContext(ProjectsContext);
