import { defineStore } from "pinia";
import { getUsers, createUser, updateUser, deleteUser } from "./api";

export const useUsersStore = defineStore("users", {
  state: () => ({
    list: [],
    loading: false,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const { data } = await getUsers();
        this.list = data;
      } finally {
        this.loading = false;
      }
    },
    async addUser(user) {
      const { data } = await createUser(user);
      this.list.push(data);
    },
    async editUser(id, user) {
      const { data } = await updateUser(id, user);
      const idx = this.list.findIndex((u) => u.id === id);
      if (idx !== -1) this.list[idx] = data;
    },
    async removeUser(id) {
      await deleteUser(id);
      this.list = this.list.filter((u) => u.id !== id);
    },
  },
});
