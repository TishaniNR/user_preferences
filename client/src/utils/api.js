const API_BASE_URL = "http://localhost:8000/api";

export function getUserIdFromURL() {
  const pathParts = window.location.pathname.split("/");
  return pathParts[2] || null;
}

export const api = {
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  getUserData: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  updateUserData: async (userId, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  },
};
