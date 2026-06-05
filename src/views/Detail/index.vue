<template>
  <div class="detail-page">
    <!-- 顶部导航 -->
    <NavBar title="套餐详情" :show-back="true" />

    <!-- 套餐基础信息卡片 -->
    <div class="package-header">
      <div class="package-header__top flex-between">
        <div>
          <h2 class="package-header__name">{{ packageInfo.name }}</h2>
          <span v-if="packageInfo.tag" class="package-header__tag">{{ packageInfo.tag }}</span>
        </div>
        <div class="package-header__price">
          <span class="price-num">{{ currentPrice }}</span>
          <span class="price-unit">元/月</span>
        </div>
      </div>
      <p class="package-header__desc">{{ packageInfo.desc }}</p>
    </div>

    <!-- 套餐权益 -->
    <div class="section">
      <h3 class="section__title">套餐权益</h3>
      <div class="benefits">
        <div v-for="benefit in packageInfo.benefits" :key="benefit.label" class="benefit-item">
          <div class="benefit-item__icon-wrap">
            <img :src="benefit.icon" :alt="benefit.label" class="benefit-item__icon" />
          </div>
          <span class="benefit-item__label">{{ benefit.label }}</span>
          <span class="benefit-item__value">{{ benefit.value }}</span>
        </div>
      </div>
    </div>

    <!-- 资费说明 -->
    <div class="section">
      <h3 class="section__title">资费说明</h3>
      <div class="fee-table">
        <div class="fee-table__row fee-table__row--head">
          <span class="fee-table__cell">项目</span>
          <span class="fee-table__cell">内容</span>
        </div>
        <div
          v-for="row in packageInfo.feeDetail"
          :key="row.item"
          class="fee-table__row"
        >
          <span class="fee-table__cell fee-table__cell--label">{{ row.item }}</span>
          <span class="fee-table__cell">{{ row.content }}</span>
        </div>
      </div>
    </div>

    <!-- 套餐规格选择 -->
    <div class="section">
      <h3 class="section__title">套餐规格</h3>
      <div class="spec-list">
        <div
          v-for="spec in packageInfo.specs"
          :key="spec.id"
          class="spec-item"
          :class="{ active: selectedSpec === spec.id }"
          @click="handleSpecChange(spec.id)"
        >
          <div class="spec-item__header flex-between">
            <span class="spec-item__name">{{ spec.name }}</span>
            <span class="spec-item__price">{{ spec.price }}<small>元/月</small></span>
          </div>
          <ul class="spec-item__features">
            <li v-for="f in spec.features" :key="f">{{ f }}</li>
          </ul>
          <div v-if="selectedSpec === spec.id" class="spec-item__check">✓</div>
        </div>
      </div>
    </div>

    <!-- 底部占位 -->
    <div class="detail-bottom-placeholder" />

    <!-- 底部操作栏 -->
    <div class="detail-bar safe-area-bottom">
      <div class="detail-bar__price">
        <span class="detail-bar__num">{{ currentPrice }}</span>
        <span class="detail-bar__unit">元/月</span>
      </div>
      <button class="detail-bar__btn" @click="handleBooking">立即预约</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()

// ==================== 套餐静态数据 ====================
const packageInfo = ref({
  id: 1,
  name: '5G畅享套餐A',
  tag: '热卖',
  desc: '30GB高速流量 + 200分钟国内通话，畅享5G极速网络，支持多终端共享',
  benefits: [
    { icon: '/icons/benefit-data.svg', label: '通用流量', value: '30GB/月' },
    { icon: '/icons/benefit-call.svg', label: '语音通话', value: '200分钟/月' },
    { icon: '/icons/benefit-5g.svg', label: '5G网络', value: '极速上网' },
    { icon: '/icons/benefit-video.svg', label: '视频会员', value: '赠送3个月' },
  ],
  feeDetail: [
    { item: '月基本费', content: '39元/月' },
    { item: '套外流量', content: '5元/GB' },
    { item: '套外通话', content: '0.15元/分钟' },
    { item: '国内短信', content: '0.1元/条' },
    { item: '来电显示', content: '免费' },
    { item: '合约期', content: '12个月' },
  ],
  specs: [
    {
      id: 1,
      name: '基础版',
      price: 39,
      features: ['30GB流量', '200分钟通话', '5G上网'],
    },
    {
      id: 2,
      name: '畅享版',
      price: 59,
      features: ['60GB流量', '500分钟通话', '5G上网', '含视频会员'],
    },
    {
      id: 3,
      name: '尊享版',
      price: 99,
      features: ['100GB流量', '1000分钟通话', '5G极速', '含视频会员', '宽带300M'],
    },
  ],
})

// ==================== 规格选择 ====================
const selectedSpec = ref(1)

const currentPrice = computed(() => {
  const spec = packageInfo.value.specs.find((s) => s.id === selectedSpec.value)
  return spec ? spec.price : packageInfo.value.specs[0].price
})

const handleSpecChange = (id) => {
  selectedSpec.value = id
}

// ==================== 跳转预约 ====================
const handleBooking = () => {
  router.push(`/booking?packageId=${packageInfo.value.id}&specId=${selectedSpec.value}`)
}
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 60px;
}

/* ========== 套餐头部 ========== */
.package-header {
  margin: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #1989fa, #0d6efd);
  border-radius: 10px;
  color: #fff;
}

.package-header__name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.package-header__tag {
  display: inline-block;
  padding: 2px 8px;
  font-size: 10px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 3px;
}

.package-header__price {
  text-align: right;
}

.price-num {
  font-size: 26px;
  font-weight: 800;
}

.price-unit {
  font-size: 12px;
  opacity: 0.85;
}

.package-header__desc {
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.5;
}

/* ========== 通用分区 ========== */
.section {
  margin: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
}

.section__title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 14px;
  padding-left: 8px;
  border-left: 3px solid #1989fa;
}

/* ========== 权益 ========== */
.benefits {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  background: #f8faff;
  border-radius: 8px;
}

.benefit-item__icon-wrap {
  width: 40px;
  height: 40px;
  margin-bottom: 6px;
}

.benefit-item__icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.benefit-item__label {
  font-size: 11px;
  color: #999;
  margin-bottom: 2px;
}

.benefit-item__value {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

/* ========== 资费表格 ========== */
.fee-table {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #eee;
}

.fee-table__row {
  display: flex;
}

.fee-table__row--head {
  background: #f8faff;
}

.fee-table__row--head .fee-table__cell {
  font-weight: 600;
  color: #333;
}

.fee-table__cell {
  flex: 1;
  padding: 10px 12px;
  font-size: 13px;
  color: #666;
  border-bottom: 1px solid #eee;
}

.fee-table__cell--label {
  color: #999;
  flex: 0 0 80px;
}

.fee-table__row:last-child .fee-table__cell {
  border-bottom: none;
}

/* ========== 规格选择 ========== */
.spec-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.spec-item {
  position: relative;
  padding: 14px;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.25s;
}

.spec-item.active {
  border-color: #1989fa;
  background: #f8faff;
}

.spec-item__header {
  margin-bottom: 8px;
}

.spec-item__name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.spec-item__price {
  font-size: 18px;
  font-weight: 700;
  color: #ee5a24;
}

.spec-item__price small {
  font-size: 11px;
  font-weight: 400;
  color: #999;
}

.spec-item__features {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.spec-item__features li {
  padding: 2px 8px;
  font-size: 11px;
  color: #666;
  background: #f5f5f5;
  border-radius: 3px;
}

.spec-item.active .spec-item__features li {
  background: #e8f4ff;
  color: #1989fa;
}

.spec-item__check {
  position: absolute;
  top: -1px;
  right: -1px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #fff;
  background: #1989fa;
  border-radius: 0 8px 0 8px;
}

/* ========== 底部操作栏 ========== */
.detail-bottom-placeholder {
  height: 56px;
}

.detail-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #fff;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.06);
}

.detail-bar__price {
  flex: 1;
}

.detail-bar__num {
  font-size: 24px;
  font-weight: 800;
  color: #ee5a24;
}

.detail-bar__unit {
  font-size: 11px;
  color: #999;
}

.detail-bar__btn {
  padding: 10px 32px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #ff6b3d, #ee5a24);
  border-radius: 22px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.detail-bar__btn:active {
  opacity: 0.85;
}
</style>
