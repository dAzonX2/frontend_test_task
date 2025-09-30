<template>
  <table border="1" cellpadding="5" cellspacing="0">
    <thead>
      <tr>
        <th>Имя</th>
        <th>Email</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <UserRow
        v-for="u in users"
        :key="u.id"
        :user="u"
        @edit="$emit('edit', $event[0], $event[1])"
        @delete="$emit('delete', $event)"
      />
    </tbody>
  </table>
</template>

<script setup>
import UserRow from "@/entities/user/ui/UserRow.vue";

defineProps({
  users: { type: Array, required: true },
});
defineEmits(["edit", "delete"]);
</script>
