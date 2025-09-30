<template>
  <UiTable>
    <thead>
      <tr>
        <th>Пользователь</th>
        <th>Номер телефона</th>
        <th>Email</th>
        <th>Дата регистрации</th>
        <th>Код</th>
        <th>Город</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <UsersTableRow 
        v-for="user in users" 
        :key="user.id"
        :user="user"
      />
    </tbody>
  </UiTable>
</template>

<script setup>
import { UiTable } from '@/shared/ui/table';
import { UsersTableRow } from './UsersTableRow';
import { useUsersTable } from '../lib/use-users-table';

const { users } = useUsersTable();
</script>