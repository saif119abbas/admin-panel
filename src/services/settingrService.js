class UserService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";
  }

  async fetchUsers() {
    try {
      const response = await fetch(`${this.baseURL}/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const response = await fetch(`${this.baseURL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create user");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${this.baseURL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const response = await fetch(`${this.baseURL}/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete user");
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(`${this.baseURL}/users/avatar`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }

      return await response.json();
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
