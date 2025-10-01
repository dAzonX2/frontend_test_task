<template>
  <div class="users-page">
    <div class="header">
      <div class="header-left">
        <h1 class="page-title">Управление пользователями</h1>
      </div>
      <div class="header-right">
        <input class="search" v-model="search" placeholder="Поиск по имени, телефону, email..." />
        <AddUserForm @added="addUser" />
      </div>
    </div>

    <div class="content">
      <UsersTable
        :users="filteredUsers"
        @edit="editUser"
        @delete="removeUser"
      />
    </div>
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
  min-height: 100vh;
  min-width: 100vw;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-bottom: 1px solid #e0e6ed;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: flex-end;
}

.search {
  width: 350px;
  padding: 12px 16px;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.search:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

.search::placeholder {
  color: #909399;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}
</style>