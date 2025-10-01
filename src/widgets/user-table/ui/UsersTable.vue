<template>
  <table class="users-table">
    <thead>
      <tr>
        <th>Имя</th>
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
        @edit="$emit('edit', $event[0], $event[1])"
        @delete="$emit('delete', $event)"
      />
    </tbody>
  </table>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Вперед</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import UserRow from "@/entities/user/ui/UserRow.vue";

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

defineEmits(["edit", "delete"]);

const itemsPerPage = ref(10)
const currentPage = ref(1)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return props.users.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(props.users.length / itemsPerPage.value))

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<style scoped>
.users-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.users-table th, .users-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.users-table th {
  background: #fafafa;
  font-weight: 600;
}

.actions {
  width: 200px;
  text-align: center;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
