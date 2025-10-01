<template>
  <form class="add-form" @submit.prevent="add">
    <input v-model="name" placeholder="Имя" class="input" />
    <input v-model="email" placeholder="Email" class="input" />
    <button type="submit" class="btn btn-add">+ Добавить пользователя</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["added"]);
const name = ref("");
const email = ref("");

function add() {
  if (!name.value || !email.value) return;
  emit("added", { name: name.value, email: email.value });
  name.value = "";
  email.value = "";
}
</script>

<style scoped>
.add-form {
  display: flex;
  gap: 10px;
}

.input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.btn-add {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-add:hover {
  background: #1565c0;
}
</style>
