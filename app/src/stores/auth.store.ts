import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export interface User {
  id: string;
  name: string;
  email?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<User | null>(null);

  const isAuthenticated = computed(() => Boolean(token.value));

  function setToken(value: string | null) {
    token.value = value;
    if (value) localStorage.setItem('token', value);
    else localStorage.removeItem('token');
  }

  async function login(username: string, _password: string) {
    // placeholder: simulate password check without real auth
    if (!_password || _password.length < 1) {
      throw new Error('Password required');
    }
    // TODO: replace with real API call
    setToken('dev-token');
    user.value = { id: '1', name: username };
    return true;
  }

  function logout() {
    setToken(null);
    user.value = null;
  }

  return { token, user, isAuthenticated, login, logout, setToken };
});
