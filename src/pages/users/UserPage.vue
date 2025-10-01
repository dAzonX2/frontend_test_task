<template>
  <div class="users-page">
    <div class="header">
      <div class="search-container">
        <input 
          class="search" 
          v-model="searchQuery" 
          placeholder="Поиск по имени, телефону, email, городу..." 
          @input="handleSearch"
        />
        <div class="search-results-info" v-if="searchQuery">
          Найдено: {{ filteredUsers.length }} пользователей
        </div>
      </div>
      <button class="add-btn" @click="openAddModal">
        Добавить пользователя
      </button>
    </div>

    <div class="content">
      <UsersTable
        :users="filteredUsers"
        @edit="editUser"
        @delete="removeUser"
      />
    </div>

    <!-- Модальное окно добавления пользователя -->
    <AddUserModal ref="addUserModal" @added="addUser" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useUsersStore } from "@/entities/user/model/store";
import UsersTable from "@/widgets/user-table/ui/UsersTable.vue";
import AddUserModal from "@/features/user-add/AddUser.vue";

const store = useUsersStore();
const searchQuery = ref("");
const addUserModal = ref(null);

// Оптимизированный поиск с debounce
let searchTimeout = null;

const handleSearch = () => {
  // Очищаем предыдущий таймаут
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  // Устанавливаем новый таймаут для задержки поиска
  searchTimeout = setTimeout(() => {
    // Поиск выполняется автоматически через computed свойство
  }, 300); // Задержка 300ms
};

// Основная функция поиска
const searchUsers = (users, query) => {
  if (!query.trim()) {
    return users;
  }

  const lowerQuery = query.toLowerCase().trim();
  
  return users.filter(user => {
    // Поиск по всем текстовым полям
    return (
      (user.name && user.name.toLowerCase().includes(lowerQuery)) ||
      (user.phone_number && user.phone_number.toLowerCase().includes(lowerQuery)) ||
      (user.email && user.email.toLowerCase().includes(lowerQuery)) ||
      (user.city && user.city.toLowerCase().includes(lowerQuery)) ||
      (user.code && user.code.toString().toLowerCase().includes(lowerQuery)) ||
      (user.reg_date && user.reg_date.toLowerCase().includes(lowerQuery))
    );
  });
};

// Computed свойство для отфильтрованных пользователей
const filteredUsers = computed(() => {
  return searchUsers(store.list, searchQuery.value);
});

// Watcher для отслеживания изменений в store
watch(() => store.list, () => {
  // При изменении списка пользователей поиск автоматически обновится
}, { deep: true });

onMounted(() => {
  store.fetchUsers();
});

// Методы для работы с модальным окном
const openAddModal = () => {
  if (addUserModal.value) {
    addUserModal.value.openModal();
  }
};

const addUser = (data) => {
  store.addUser(data);
  // Очищаем поиск после добавления нового пользователя
  searchQuery.value = "";
};

const editUser = (id, data) => store.editUser(id, data);
const removeUser = (id) => store.removeUser(id);

// Очистка таймаута при уничтожении компонента
import { onUnmounted } from 'vue';
onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
});
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

.header[data-v-1edba4c2] {
    display: flex;
    flex-direction: row;
    padding: 16px;
    background: white;
    border-bottom: 1px solid #e0e6ed;
    width: 100%;
    gap: 16px;
}

.search-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  background: #fafafa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.2s ease;
}

.search:focus {
  border-color: #409eff;
  background: white;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
  outline: none;
}

.search::placeholder {
  color: #8c939d;
  font-weight: 400;
}

.search-results-info {
  font-size: 12px;
  color: #409eff;
  font-weight: 500;
  padding: 0 4px;
}

.add-btn {
  padding: 10px 20px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  white-space: nowrap;
  flex-shrink: 0;
}

.add-btn:hover {
  background: #337ecc;
  transform: translateY(-1px);
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 12px;
    padding: 12px 16px;
  }
  
  .search-container {
    width: 100%;
  }
  
  .add-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 10px 12px;
  }
}
</style>