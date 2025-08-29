import { defineStore } from 'pinia';
import router from '@/router';
import apiClient from '@/api'; // Import our configured Axios instance

export const useUserStore = defineStore('user', {
  state: () => ({
    // Initialize state from localStorage to keep user logged in on page refresh
    token: localStorage.getItem('token') || null,
    username: '',
    role: 'user' as 'user' | 'admin',
  }),

  getters: {
    // A getter to easily check if the user is logged in
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
  },

  actions: {
    // The main login action
    async login(username: string, password: string) {
      try {
        // Call the /user/login endpoint
        const response = await apiClient.post('/user/login', { username, password });

        // IMPORTANT: The OpenAPI spec for login returns a User object.
        // A real-world login almost ALWAYS returns a token. I am assuming
        // your backend response looks like: { token: '...', user: { ... } }
        // Please adjust 'response.data.token' if your backend is different.
        const token = response.data.token;
        const user = response.data.user; // Assuming user info is nested

        if (!token || !user) {
          console.error("Login response is missing token or user data!");
          return false;
        }

        // Store the token in state and localStorage
        this.token = token;
        localStorage.setItem('token', token);

        // Update user information in the store
        this.username = user.username;
        this.role = user.isAdmin ? 'admin' : 'user';

        return true; // Indicate success
      } catch (error) {
        console.error('Login failed:', error);
        // Clean up any partial state
        this.logout();
        return false; // Indicate failure
      }
    },

    // Fetches user info if a token exists (useful for page reloads)
    async fetchUserInfo() {
      if (this.isLoggedIn) {
        try {
          const response = await apiClient.get('/user/info');
          const user = response.data;
          this.username = user.username;
          this.role = user.isAdmin ? 'admin' : 'user';
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          // The token might be invalid, so log out
          this.logout();
        }
      }
    },

    // The logout action
    logout() {
      // Clear all state
      this.token = null;
      this.username = '';
      this.role = 'user';

      // Remove the token from localStorage
      localStorage.removeItem('token');

      // Redirect to the login page
      router.push('/login');
    },
  },
});
