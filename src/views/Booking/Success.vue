<template>
  <div class="success-page">
    <div class="success-card">
      <div class="success-card__icon">✓</div>
      <h2 class="success-card__title">预约成功</h2>
      <p class="success-card__desc">您的预约申请已提交，</p>
      <p class="success-card__desc">工作人员将在24小时内与您联系确认。</p>
      <div class="success-card__actions">
        <button class="success-card__btn" @click="goHome">返回首页</button>
        <button class="success-card__btn success-card__btn--outline" @click="goDetail">查看套餐</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goHome = () => {
  router.push('/')
}

const goDetail = () => {
  const packageId = route.query.packageId
  if (packageId) {
    router.push(`/detail/${packageId}`)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 32px;
}

.success-card {
  width: 100%;
  max-width: 300px;
  padding: 40px 28px;
  background: #fff;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.success-card__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #28ca72, #1aad5a);
  border-radius: 50%;
}

.success-card__title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
}

.success-card__desc {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
}

.success-card__actions {
  margin-top: 28px;
  display: flex;
  gap: 12px;
}

.success-card__btn {
  flex: 1;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #1989fa, #0d6efd);
  border-radius: 20px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.success-card__btn:active {
  opacity: 0.85;
}

.success-card__btn--outline {
  color: #1989fa;
  background: #fff;
  border: 1px solid #1989fa;
}
</style>
