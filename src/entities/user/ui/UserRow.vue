<template>
  <tr :class="{ selected: selected }">
    <td class="selection-cell">
      <input 
        type="checkbox" 
        :checked="selected"
        @change="$emit('select', user.id)"
        class="user-checkbox"
      >
    </td>
    <td>
      <template v-if="!editing">
        {{ user.name }}
      </template>
      <input v-else v-model="editData.name" class="input edit-input" />
    </td>

    <td>
      <template v-if="!editing">
        {{ user.phone_number }}
      </template>
      <input v-else v-model="editData.phone_number" class="input edit-input" />
    </td>

    <td>
      <template v-if="!editing">
        {{ user.email }}
      </template>
      <input v-else v-model="editData.email" class="input edit-input" />
    </td>

    <td>
      <template v-if="!editing">
        {{ user.reg_date }}
      </template>
      <input v-else v-model="editData.reg_date" class="input edit-input" />
    </td>

    <td>
      <template v-if="!editing">
        {{ user.code }}
      </template>
      <input v-else v-model="editData.code" class="input edit-input" />
    </td>

    <td>
      <template v-if="!editing">
        {{ user.city }}
      </template>
      <input v-else v-model="editData.city" class="input edit-input" />
    </td>
  </tr>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  user: { type: Object, required: true },
  selected: { type: Boolean, default: false }
});

const emit = defineEmits(["edit", "delete", "select"]);

const editing = ref(false);
const editData = ref({ ...props.user });

function startEdit() {
  editing.value = true;
}

function saveEdit() {
  emit("edit", props.user.id, editData.value);
  editing.value = false;
}

function cancelEdit() {
  editing.value = false;
  editData.value = { ...props.user };
}
</script>

<style scoped>
tr {
  transition: background-color 0.2s ease;
}

tr.selected td {
  background-color: #e6f7ff !important;
}

tr.selected:hover td {
  background-color: #d0e9ff !important;
}

td {
  position: relative;
  transition: background-color 0.2s ease;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #C6D1DD80;
}

.selection-cell {
  width: 50px;
  text-align: center;
  padding-left: 0 !important;
}

.edit-input {
  padding: 6px 8px;
  font-size: 13px;
  border: 1px solid #409eff;
  background: #f0f7ff;
}

.actions-cell {
  width: 140px;
  padding: 8px !important;
}

.actions {
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
}

.user-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.user-checkbox:checked {
  accent-color: #409eff;
}
</style>