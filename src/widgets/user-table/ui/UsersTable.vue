<template>
  <div class="table-wrapper">
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th class="selection-header">
              <input 
                type="checkbox" 
                v-model="allSelected"
                @change="toggleAllSelection"
                class="header-checkbox"
              >
            </th>
            <th>Пользователь</th>
            <th>Номер телефона</th>
            <th>Email</th>
            <th>Дата регистрации</th>
            <th>Код</th>
            <th>Город</th>
          </tr>
        </thead>
        <tbody>
          <UserRow
            v-for="u in paginatedUsers"
            :key="u.id"
            :user="u"
            :selected="isSelected(u.id)"
            @select="toggleSelection"
            @edit="$emit('edit', $event[0], $event[1])"
            @delete="$emit('delete', $event)"
          />
        </tbody>
      </table>
    </div>
    
    <div class="pagination-section">
      <div class="pagination-left">
        <div class="selection-info" v-if="selectedUsers.size > 0">
          Выбрано: {{ selectedUsers.size }} пользователей
          <button class="clear-selection" @click="clearSelection">Сбросить</button>
        </div>
        <div v-else class="pagination-controls-group">
          <span class="pagination-label">Отображать по:</span>
          <select v-model="itemsPerPage" class="page-select">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      
      <div class="pagination-center">
        <span class="pagination-info">{{ startItem }}-{{ endItem }} из {{ props.users.length }} пользователей</span>
      </div>
      
      <div class="pagination-right">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          ‹
        </button>
        
        <div class="page-indicator">
          Страница <strong>{{ currentPage }}</strong> из {{ totalPages }}
        </div>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import UserRow from "@/entities/user/ui/UserRow.vue";

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

defineEmits(["edit", "delete"]);

const itemsPerPage = ref(18)
const currentPage = ref(1)
const selectedUsers = ref(new Set())
const allSelected = ref(false)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return props.users.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(props.users.length / itemsPerPage.value))
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, props.users.length))

// Методы для работы с выделением
const isSelected = (userId) => {
  return selectedUsers.value.has(userId)
}

const toggleSelection = (userId) => {
  if (selectedUsers.value.has(userId)) {
    selectedUsers.value.delete(userId)
  } else {
    selectedUsers.value.add(userId)
  }
  updateAllSelectedState()
}

const toggleAllSelection = () => {
  if (allSelected.value) {
    // Выделить все на текущей странице
    paginatedUsers.value.forEach(user => {
      selectedUsers.value.add(user.id)
    })
  } else {
    // Снять выделение со всех на текущей странице
    paginatedUsers.value.forEach(user => {
      selectedUsers.value.delete(user.id)
    })
  }
}

const clearSelection = () => {
  selectedUsers.value.clear()
  allSelected.value = false
}

const updateAllSelectedState = () => {
  if (paginatedUsers.value.length === 0) {
    allSelected.value = false
    return
  }
  
  // Проверяем, все ли пользователи на текущей странице выделены
  const allPageUsersSelected = paginatedUsers.value.every(user => 
    selectedUsers.value.has(user.id)
  )
  allSelected.value = allPageUsersSelected
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

// Сброс страницы при изменении размера страницы
watch(itemsPerPage, () => {
  currentPage.value = 1
})

// Следим за изменениями на текущей странице для обновления состояния checkbox "Выделить все"
watch(paginatedUsers, () => {
  updateAllSelectedState()
})
</script>

<style scoped>
.table-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.table-container {
  flex: 1;
  overflow: auto;
  background: white;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  min-height: 400px;
}

.users-table th {
  background: #F0F2F480;
  color: #7B8395;
  font-weight: 600;
  padding: 16px 12px;
  text-align: left;
  border-right: 1px solid #C6D1DD80;
  font-size: 14px;
}

.users-table th:first-child {
  border-top-left-radius: 0;
}

.users-table th:last-child {
  border-top-right-radius: 0;
  border-right: none;
}

.actions-header {
  width: 140px;
  text-align: center;
}

.users-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  color: #2c3e50;
  background: white;
}

.users-table td:last-child {
  border-right: none;
}

.users-table tr:last-child td {
  border-bottom: 1px solid #e8e8e8;
}

.users-table tr:hover td {
  background-color: #f8fafc;
}

/* Стили пагинации */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8fafc;
  border-top: 1px solid #e0e6ed;
  gap: 20px;
}

.pagination-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.pagination-label {
  color: #606266;
  font-size: 14px;
  font-weight: 500;
}

.page-select {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  min-width: 80px;
}

.page-select:focus {
  border-color: #409eff;
}

.pagination-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.pagination-info {
  color: #606266;
  font-size: 14px;
  font-weight: 500;
}

.pagination-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: flex-end;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #dcdfe6;
  color: #606266;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #409eff;
  border-color: #409eff;
  color: white;
  transform: translateY(-1px);
}

.pagination-btn:disabled {
  background: #f5f7fa;
  color: #c0c4cc;
}

.page-indicator {
  color: #606266;
  font-size: 14px;
  margin: 0 8px;
}

.page-indicator strong {
  color: #2c3e50;
}

.selection-header {
  width: 50px;
  text-align: center !important;
}

.header-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.user-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.user-checkbox:checked {
  accent-color: #409eff;
}

.header-checkbox:checked {
  accent-color: #409eff;
}
</style>