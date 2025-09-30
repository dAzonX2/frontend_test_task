<template>
  <div>
    <h2>Пользователи</h2>
    <input v-model="search" placeholder="Поиск..." />

    <AddUserForm @added="addUser" />

    <UsersTable
      :users="filteredUsers"
      @edit="editUser"
      @delete="removeUser"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUsersStore } from "@/entities/user/model/store";
import UsersTable from "@/widgets/user-table/ui/UsersTable.vue";
import AddUserForm from "@/features/user-add/AddUser.vue";

const store = useUsersStore();
const search = ref("");

const filteredUsers = computed(() =>
  store.list.filter(
    (u) =>
      u.name.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase())
  )
);

onMounted(store.fetchUsers);

const addUser = (data) => store.addUser(data);
const editUser = (id, data) => store.editUser(id, data);
const removeUser = (id) => store.removeUser(id);
</script>
