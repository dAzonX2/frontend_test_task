<template>
  <tr>
    <td v-if="!editing">{{ user.name }}</td>
    <td v-else><input v-model="editData.name" /></td>

    <td v-if="!editing">{{ user.email }}</td>
    <td v-else><input v-model="editData.email" /></td>

    <td>
      <button v-if="!editing" @click="startEdit">Редактировать</button>
      <button v-else @click="saveEdit">Сохранить</button>
      <button @click="$emit('delete', user.id)">Удалить</button>
    </td>
  </tr>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  user: { type: Object, required: true },
});

const emit = defineEmits(["edit", "delete"]);

const editing = ref(false);
const editData = ref({ ...props.user });

function startEdit() {
  editing.value = true;
}

function saveEdit() {
  emit("edit", props.user.id, editData.value);
  editing.value = false;
}
</script>
