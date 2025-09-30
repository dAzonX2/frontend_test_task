<template>
  <form @submit.prevent="add">
    <input v-model="name" placeholder="Имя" />
    <input v-model="email" placeholder="Email" />
    <button type="submit">Добавить</button>
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
