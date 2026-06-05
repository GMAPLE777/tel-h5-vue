<template>
  <div class="tabbar safe-area-bottom">
    <div
      v-for="item in tabs"
      :key="item.path"
      class="tabbar-item"
      :class="{ active: currentPath === item.path }"
      @click="handleTabClick(item)"
    >
      <div class="tabbar-icon">
        <img v-if="currentPath === item.path && item.iconActive" :src="item.iconActive" alt="" />
        <img v-else :src="item.icon" alt="" />
      </div>
      <span class="tabbar-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
    // tabs: [{ path, label, icon, iconActive }]
  },
})

const router = useRouter()
const route = useRoute()

const currentPath = computed(() => route.path)

const handleTabClick = (item) => {
  if (item.path !== currentPath.value) {
    router.push(item.path)
  }
}
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  background: #fff;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.06);
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  cursor: pointer;
}

.tabbar-icon {
  width: 22px;
  height: 22px;
  margin-bottom: 2px;
}

.tabbar-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tabbar-label {
  font-size: 10px;
  color: #999;
  line-height: 1;
}

.tabbar-item.active .tabbar-label {
  color: #1989fa;
}
</style>
