<template>
  <div class="modal-overlay" v-if="isVisible" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Добавить пользователя</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="submitForm" class="user-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Имя *</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="form-input"
                placeholder="Введите имя"
              >
            </div>
            <div class="form-group">
              <label for="phone">Номер телефона *</label>
              <input
                id="phone"
                v-model="formData.phone_number"
                type="tel"
                required
                class="form-input"
                placeholder="+7 (XXX) XXX-XX-XX"
              >
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email *</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="form-input"
                placeholder="example@mail.ru"
              >
            </div>
            <div class="form-group">
              <label for="city">Город</label>
              <input
                id="city"
                v-model="formData.city"
                type="text"
                class="form-input"
                placeholder="Введите город"
              >
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="code">Код</label>
              <input
                id="code"
                v-model="formData.code"
                type="text"
                class="form-input"
                placeholder="Введите код"
              >
            </div>
            <div class="form-group">
              <label for="reg_date">Дата регистрации</label>
              <input
                id="reg_date"
                v-model="formData.reg_date"
                type="date"
                class="form-input"
              >
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-cancel" @click="closeModal">
              Отмена
            </button>
            <button type="submit" class="btn btn-submit" :disabled="!isFormValid">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const emit = defineEmits(['added', 'close'])

const isVisible = ref(false)
const formData = reactive({
  name: '',
  phone_number: '',
  email: '',
  city: '',
  code: '',
  reg_date: ''
})

// Валидация формы
const isFormValid = computed(() => {
  return formData.name.trim() && 
         formData.phone_number.trim() && 
         formData.email.trim()
})

// Методы для управления модальным окном
const openModal = () => {
  isVisible.value = true
  // Сброс формы при открытии
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
}

const closeModal = () => {
  isVisible.value = false
  emit('close')
}

const submitForm = () => {
  if (isFormValid.value) {
    emit('added', { ...formData })
    closeModal()
  }
}

// Экспортируем методы для использования извне
defineExpose({
  openModal,
  closeModal
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e0e6ed;
}

.modal-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #909399;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f5f7fa;
  color: #606266;
}

.modal-body {
  padding: 24px;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.form-group label::after {
  content: '*';
  color: #f56c6c;
  margin-left: 2px;
}

.form-group label:not([for*="name"]):not([for*="phone"]):not([for*="email"])::after {
  content: '';
}

.form-input {
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;
}

.form-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
  outline: none;
}

.form-input:required:invalid {
  border-color: #f56c6c;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e0e6ed;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.btn-cancel {
  background: #f5f7fa;
  color: #606266;
  border: 1px solid #dcdfe6;
}

.btn-cancel:hover {
  background: #e4e7ed;
  color: #606266;
}

.btn-submit {
  background: #409eff;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #337ecc;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  background: #a0cfff;
  cursor: not-allowed;
  transform: none;
}

/* Адаптивность */
@media (max-width: 768px) {
  .modal-content {
    margin: 20px;
    max-height: calc(100vh - 40px);
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-body {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .modal-header {
    padding: 16px;
  }
  
  .modal-body {
    padding: 16px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    min-width: auto;
    width: 100%;
  }
}
</style>