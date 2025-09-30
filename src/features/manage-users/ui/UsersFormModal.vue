<template>
  <UiModal v-model="isOpen">
    <template #header>
      <h2>{{ mode === 'create' ? 'Добавить' : 'Редактировать' }} пользователя</h2>
    </template>
    
    <UserForm 
      :user="user"
      :mode="mode"
      @submit="handleSubmit"
      @cancel="close"
    />
  </UiModal>
</template>

<script setup>
import { computed } from 'vue';
import { UiModal } from '@/shared/ui/modal';
import { UserForm } from './UserForm';
import { useUserFormModal } from '../lib/use-user-form-modal';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  user: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue', 'success']);

const { handleSubmit } = useUserFormModal(props, emit);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const close = () => {
  isOpen.value = false;
};
</script>