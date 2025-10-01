<template>
  <tr>
    <td v-if="!editing">{{ user.name }}</td>
    <td v-else><input v-model="editData.name" class="input" /></td>

    <td v-if="!editing">{{ user.phone_number }}</td>
    <td v-else><input v-model="editData.phone_number" class="input" /></td>

    <td v-if="!editing">{{ user.email }}</td>
    <td v-else><input v-model="editData.email" class="input" /></td>

    <td v-if="!editing">{{ user.reg_date }}</td>
    <td v-else><input v-model="editData.reg_date" class="input" /></td>

    <td v-if="!editing">{{ user.code }}</td>
    <td v-else><input v-model="editData.code" class="input" /></td>

    <td v-if="!editing">{{ user.city }}</td>
    <td v-else><input v-model="editData.city" class="input" /></td>

    <!-- <td class="actions">
      <button
        v-if="!editing"
        class="btn btn-edit"
        @click="startEdit"
      >
        Редактировать
      </button>
      <button
        v-else
        class="btn btn-save"
        @click="saveEdit"
      >
        Сохранить
      </button>
      <button class="btn btn-delete" @click="$emit('delete', user.id)">
        Удалить
      </button>
    </td> -->
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

<style scoped>
.input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.btn-edit {
  background: #f0f0f0;
}
.btn-edit:hover {
  background: #e0e0e0;
}

.btn-save {
  background: #4caf50;
  color: white;
}
.btn-save:hover {
  background: #43a047;
}

.btn-delete {
  background: #f44336;
  color: white;
}
.btn-delete:hover {
  background: #e53935;
}
</style>
