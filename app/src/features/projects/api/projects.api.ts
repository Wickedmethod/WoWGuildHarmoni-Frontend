import type { Project } from '../types';

const STORAGE_KEY = 'demo-projects';

function seed(): Project[] {
  return [
    { id: 'p1', name: 'Alpha', description: 'First project' },
    { id: 'p2', name: 'Beta', description: 'Second project' },
    { id: 'p3', name: 'Gamma', description: 'Third project' },
  ];
}

function load(): Project[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seed();
  try {
    return JSON.parse(raw) as Project[];
  } catch {
    return seed();
  }
}

function save(data: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchProjects(): Promise<Project[]> {
  return delay(load());
}

export async function fetchProject(id: string): Promise<Project> {
  const found = load().find((p) => p.id === id);
  if (!found) throw new Error('Project not found');
  return delay(found);
}

export type UpsertProjectInput = {
  name: string;
  description: string;
};

export async function createProject(input: UpsertProjectInput): Promise<Project> {
  const data = load();
  const id = `p${Math.random().toString(36).slice(2, 8)}`;
  const proj: Project = { id, ...input };
  data.push(proj);
  save(data);
  return delay(proj);
}

export async function updateProject(id: string, input: UpsertProjectInput): Promise<Project> {
  const data = load();
  const idx = data.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error('Project not found');
  const current = data[idx] as Project;
  const updated: Project = { ...current, ...input, id: current.id };
  data[idx] = updated;
  save(data);
  return delay(updated);
}

export async function deleteProject(id: string): Promise<void> {
  const data = load().filter((p) => p.id !== id);
  save(data);
  return delay(undefined);
}
