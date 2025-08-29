import { describe, it, expect, beforeEach } from 'vitest';

import { fetchProjects, createProject, updateProject, deleteProject } from './projects.api';

describe('projects.api', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates and fetches projects', async () => {
    const initial = await fetchProjects();
    expect(initial.length).toBeGreaterThan(0);

    const created = await createProject({ name: 'New', description: 'Desc' });
    expect(created.id).toBeTruthy();

    const list = await fetchProjects();
    expect(list.find((p) => p.id === created.id)).toBeTruthy();
  });

  it('updates and deletes a project', async () => {
    const created = await createProject({ name: 'A', description: 'B' });
    const updated = await updateProject(created.id, { name: 'C', description: 'D' });
    expect(updated.name).toBe('C');

    await deleteProject(created.id);
    const list = await fetchProjects();
    expect(list.find((p) => p.id === created.id)).toBeFalsy();
  });
});
