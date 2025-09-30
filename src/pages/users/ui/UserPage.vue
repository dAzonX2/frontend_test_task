<template>
  <div class="users-page">
    <div class="container">
      <h1>Управление пользователями</h1>
      
      <div class="page-controls">
        <UsersFilter />
        <UiButton 
          variant="primary" 
          @click="showAddModal = true"
        >
          Добавить пользователя
        </UiButton>
      </div>
      
      <UsersTable />
      
      <UserFormModal 
        v-model="showAddModal"
        mode="create"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { UiButton } from '@/shared/ui/button';
import { UsersTable } from '@/widgets/users-table';
import { UsersFilter } from '@/features/filter-users';
import { UserFormModal } from '@/features/manage-users';

const showAddModal = ref(false);
</script>

<style scoped>
.users-page {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>