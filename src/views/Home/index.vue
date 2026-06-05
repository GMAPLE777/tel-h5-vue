<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <NavBar title="畅享套餐" />

    <!-- Banner 轮播 -->
    <div class="banner" @touchstart="onTouchStart" @touchend="onTouchEnd">
      <div
        class="banner__track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(item, i) in banners"
          :key="i"
          class="banner__slide"
          :style="{ background: item.bgColor }"
        >
          <img :src="item.img" :alt="item.alt" class="banner__img" />
          <div class="banner__text" v-if="item.title">
            <p class="banner__title">{{ item.title }}</p>
            <p class="banner__subtitle" v-if="item.subtitle">{{ item.subtitle }}</p>
          </div>
        </div>
      </div>
      <!-- 指示器 -->
      <div class="banner__dots">
        <span
          v-for="(_, i) in banners"
          :key="i"
          class="banner__dot"
          :class="{ active: currentIndex === i }"
        />
      </div>
    </div>

    <!-- 分类导航 -->
    <div class="category">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="category__item"
        :class="{ active: activeCategory === cat.id }"
        @click="handleCategoryChange(cat.id)"
      >
        <img :src="cat.icon" :alt="cat.name" class="category__icon" />
        <span class="category__name">{{ cat.name }}</span>
      </div>
    </div>

    <!-- 套餐列表 -->
    <div class="package-list">
      <div v-if="loading" class="package-list__loading">加载中...</div>
      <template v-else>
        <PackageCard
          v-for="pkg in filteredPackages"
          :key="pkg.id"
          :data="pkg"
        />
        <div v-if="filteredPackages.length === 0" class="package-list__empty">
          暂无匹配套餐
        </div>
      </template>
    </div>

    <!-- 底部占位 -->
    <div class="home-bottom-placeholder" />

    <!-- 底部导航 -->
    <TabBar :tabs="tabList" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import TabBar from '@/components/TabBar.vue'
import PackageCard from '@/components/PackageCard.vue'

// ==================== Banner 数据 ====================
const banners = ref([
  {
    img: '/images/banner-1.svg',
    alt: '5G畅享套餐',
    title: '5G畅享套餐',
    subtitle: '每月仅需39元起',
    bgColor: '#e8f4ff',
  },
  {
    img: '/images/banner-2.svg',
    alt: '家庭融合套餐',
    title: '家庭融合套餐',
    subtitle: '一人付费 全家共享',
    bgColor: '#fff4e6',
  },
  {
    img: '/images/banner-3.svg',
    alt: '流量王套餐',
    title: '流量畅享',
    subtitle: '100GB超大流量',
    bgColor: '#e6f9f0',
  },
])

// ==================== Banner 轮播逻辑 ====================
const currentIndex = ref(0)
let timer = null
const interval = 3000
let touchStartX = 0

const shouldAutoPlay = computed(() => banners.value.length > 1)

const startAutoPlay = () => {
  if (!shouldAutoPlay.value) return
  stopAutoPlay()
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % banners.value.length
  }, interval)
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const onTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
  stopAutoPlay()
}

const onTouchEnd = (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 40) {
    if (diff > 0) {
      // 左滑
      currentIndex.value = (currentIndex.value + 1) % banners.value.length
    } else {
      // 右滑
      currentIndex.value =
        (currentIndex.value - 1 + banners.value.length) % banners.value.length
    }
  }
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
  fetchPackages()
})

onUnmounted(() => {
  stopAutoPlay()
})

// ==================== 分类筛选 ====================
const categories = ref([
  { id: 'all', name: '全部', icon: '/icons/cat-all.svg' },
  { id: '5g', name: '5G套餐', icon: '/icons/cat-5g.svg' },
  { id: 'family', name: '家庭套餐', icon: '/icons/cat-family.svg' },
  { id: 'data', name: '大流量', icon: '/icons/cat-data.svg' },
  { id: 'youth', name: '青春卡', icon: '/icons/cat-youth.svg' },
])

const activeCategory = ref('all')

const handleCategoryChange = (id) => {
  activeCategory.value = id
}

// ==================== 套餐列表（从 API 获取） ====================
const packages = ref([])
const loading = ref(false)

const fetchPackages = async () => {
  loading.value = true
  try {
    const res = await import('@/api/package').then((m) => m.getPackageList())
    if (res.code === 0) {
      packages.value = res.data.list
    }
  } catch (e) {
    if (import.meta.env.DEV) console.error('获取套餐列表失败:', e)
  } finally {
    loading.value = false
  }
}

const filteredPackages = computed(() => {
  if (activeCategory.value === 'all') {
    return packages.value
  }
  return packages.value.filter((p) => p.category === activeCategory.value)
})

// ==================== 底部导航 ====================
const tabList = [
  { path: '/', label: '首页', icon: '/icons/tab-home.svg', iconActive: '/icons/tab-home-active.svg' },
  { path: '/booking', label: '预约', icon: '/icons/tab-booking.svg', iconActive: '/icons/tab-booking-active.svg' },
]
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f5f5f5;
}

/* ========== Banner ========== */
.banner {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #e8f4ff;
}

.banner__track {
  display: flex;
  transition: transform 0.35s ease;
}

.banner__slide {
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  min-height: 140px;
}

.banner__img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  margin-right: 16px;
  flex-shrink: 0;
}

.banner__text {
  flex: 1;
}

.banner__title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.banner__subtitle {
  font-size: 13px;
  color: #666;
}

.banner__dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.banner__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.banner__dot.active {
  width: 16px;
  border-radius: 3px;
  background: #1989fa;
}

/* ========== 分类导航 ========== */
.category {
  display: flex;
  justify-content: space-around;
  padding: 14px 8px;
  background: #fff;
  margin-bottom: 8px;
}

.category__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: background 0.2s;
}

.category__item.active {
  background: #e8f4ff;
}

.category__icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  margin-bottom: 4px;
}

.category__name {
  font-size: 11px;
  color: #666;
}

.category__item.active .category__name {
  color: #1989fa;
  font-weight: 600;
}

/* ========== 套餐列表 ========== */
.package-list {
  padding-top: 12px;
}

.package-list__loading {
  text-align: center;
  padding: 60px 0;
  font-size: 14px;
  color: #999;
}

.package-list__empty {
  text-align: center;
  padding: 60px 0;
  font-size: 14px;
  color: #999;
}

/* ========== 底部占位 ========== */
.home-bottom-placeholder {
  height: 62px;
}
</style>
