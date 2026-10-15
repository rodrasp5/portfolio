import { createContext, useContext } from "react";
import type { Project } from "../data/types";

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export const ProjectsContext = createContext<ProjectsState>({
  projects: [],
  loading: false,
  refresh: async () => {},
});

export const useProjects = () => useContext(ProjectsContext);
