<template>
  <div class="users-page">
    <div class="header">
      <input class="search" v-model="search" placeholder="Поиск..." />
      <AddUserForm @added="addUser" />
    </div>

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
      u.phone_number.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase()) ||
      u.reg_date.toLowerCase().includes(search.value.toLowerCase()) ||
      u.code.toLowerCase().includes(search.value.toLowerCase()) ||
      u.city.toLowerCase().includes(search.value.toLowerCase())
  )
);

onMounted(store.fetchUsers);

const addUser = (data) => store.addUser(data);
const editUser = (id, data) => store.editUser(id, data);
const removeUser = (id) => store.removeUser(id);
</script>

<style scoped>
.users-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search {
  width: 300px;
  padding: 8px 12px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  font-size: 14px;
}
</style>
