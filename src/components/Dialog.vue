<template>
  <div v-if="visible" class="dialog-overlay" @click="handleOverlayClick">
    <div class="dialog" @click.stop>
      <div class="dialog__header" v-if="title || $slots.title">
        <slot name="title">
          <h3 class="dialog__title">{{ title }}</h3>
        </slot>
      </div>
      <div class="dialog__body">
        <slot>
          <p class="dialog__content">{{ content }}</p>
        </slot>
      </div>
      <div class="dialog__footer">
        <button v-if="showCancel" class="dialog__btn dialog__btn--cancel" @click="handleCancel">
          {{ cancelText }}
        </button>
        <button class="dialog__btn dialog__btn--confirm" @click="handleConfirm">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '确定',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  closeOnOverlay: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['confirm', 'cancel', 'update:visible'])

const handleConfirm = () => {
  emit('confirm')
  emit('update:visible', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:visible', false)
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    emit('update:visible', false)
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.dialog {
  width: 280px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  animation: dialogFadeIn 0.2s ease-out;
}

@keyframes dialogFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dialog__header {
  padding: 18px 16px 8px;
  text-align: center;
}

.dialog__title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
}

.dialog__body {
  padding: 12px 16px 18px;
  text-align: center;
}

.dialog__content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.dialog__footer {
  display: flex;
  border-top: 1px solid #eee;
}

.dialog__btn {
  flex: 1;
  height: 44px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.dialog__btn:active {
  background: #f5f5f5;
}

.dialog__btn--cancel {
  color: #999;
  border-right: 1px solid #eee;
}

.dialog__btn--confirm {
  color: #1989fa;
  font-weight: 600;
}
</style>
