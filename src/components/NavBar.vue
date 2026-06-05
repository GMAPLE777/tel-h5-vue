<template>
  <div class="navbar">
    <div class="navbar-left" @click="handleBack">
      <span v-if="showBack" class="navbar-back">&lt;</span>
    </div>
    <div class="navbar-title text-ellipsis">{{ title }}</div>
    <div class="navbar-right">
      <slot name="right" />
    </div>
  </div>
  <!-- 占位元素，避免内容被固定导航遮挡 -->
  <div class="navbar-placeholder" />
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  showBack: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['back'])
const router = useRouter()

const handleBack = () => {
  if (props.showBack) {
    emit('back')
    router.back()
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 12px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.navbar-placeholder {
  height: 44px;
}

.navbar-left,
.navbar-right {
  flex: 0 0 50px;
}

.navbar-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.navbar-back {
  font-size: 18px;
  color: #333;
  cursor: pointer;
  padding: 4px;
}

.navbar-title {
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  color: #333;
}
</style>
