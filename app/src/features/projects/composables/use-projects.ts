import { computed } from 'vue';

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import {
  createProject,
  deleteProject,
  fetchProject,
  fetchProjects,
  updateProject,
} from '../api/projects.api';

export function useProjectsList() {
  const query = useQuery({ queryKey: ['projects'], queryFn: fetchProjects, staleTime: 30_000 });
  return query;
}

export function useProject(idRef: { value: string }) {
  const query = useQuery({
    queryKey: ['project', idRef],
    queryFn: () => fetchProject(idRef.value),
    enabled: computed(() => !!idRef.value),
  });
  return query;
}

export function useProjectMutations() {
  const qc = useQueryClient();
  const create = useMutation({
    mutationFn: createProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
  const update = useMutation({
    mutationFn: ({ id, input }: { id: string; input: { name: string; description: string } }) =>
      updateProject(id, input),
    onSuccess: async (_p, variables) => {
      await qc.invalidateQueries({ queryKey: ['projects'] });
      await qc.invalidateQueries({ queryKey: ['project', { value: variables.id }] });
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
  return { create, update, remove };
}
