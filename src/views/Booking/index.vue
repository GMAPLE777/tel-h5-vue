<template>
  <div class="booking-page">
    <!-- 顶部导航 -->
    <NavBar title="在线预约" :show-back="true" />

    <!-- 已选套餐信息 -->
    <div v-if="selectedPackage" class="selected-package">
      <div class="selected-package__header flex-between">
        <h3 class="selected-package__title">已选套餐</h3>
        <span class="selected-package__change" @click="goBack">重新选择</span>
      </div>
      <div class="selected-package__info flex-between">
        <div>
          <p class="selected-package__name">{{ selectedPackage.name }}</p>
          <p class="selected-package__spec">{{ selectedPackage.specName }}</p>
        </div>
        <div class="selected-package__price">
          <span class="price-num">{{ selectedPackage.price }}</span>
          <span class="price-unit">元/月</span>
        </div>
      </div>
    </div>

    <!-- 未选择套餐时 -->
    <div v-else class="no-package" @click="goBack">
      <span class="no-package__icon">📋</span>
      <p class="no-package__text">请先选择套餐</p>
      <p class="no-package__hint">点击返回套餐列表</p>
    </div>

    <!-- 填写表单 -->
    <div class="form-card">
      <h3 class="form-card__title">填写信息</h3>

      <!-- 姓名 -->
      <div class="form-item">
        <label class="form-item__label">姓名</label>
        <div class="form-item__input-wrap" :class="{ error: errors.name }">
          <input
            v-model="form.name"
            type="text"
            class="form-item__input"
            placeholder="请输入真实姓名"
            maxlength="20"
            @input="clearError('name')"
          />
          <span v-if="form.name" class="form-item__clear" @click="form.name = ''">✕</span>
        </div>
        <p v-if="errors.name" class="form-item__err-msg">{{ errors.name }}</p>
      </div>

      <!-- 手机号 -->
      <div class="form-item">
        <label class="form-item__label">手机号</label>
        <div class="form-item__input-wrap" :class="{ error: errors.phone }">
          <input
            v-model="form.phone"
            type="tel"
            class="form-item__input"
            placeholder="请输入11位手机号"
            maxlength="11"
            @input="clearError('phone')"
          />
          <span v-if="form.phone" class="form-item__clear" @click="form.phone = ''">✕</span>
        </div>
        <p v-if="errors.phone" class="form-item__err-msg">{{ errors.phone }}</p>
      </div>

      <!-- 备注 -->
      <div class="form-item">
        <label class="form-item__label">备注（选填）</label>
        <div class="form-item__input-wrap">
          <textarea
            v-model="form.remark"
            class="form-item__textarea"
            placeholder="有什么需要备注的信息吗？"
            maxlength="100"
            rows="3"
          />
        </div>
        <p class="form-item__count">{{ form.remark.length }}/100</p>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="booking-bottom">
      <button
        class="booking-btn"
        :class="{ disabled: !canSubmit }"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        提交预约
      </button>
      <p class="booking-tip">
        提交即表示同意《用户服务协议》及《隐私政策》
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()
const route = useRoute()

// ==================== 已选套餐（从路由参数获取） ====================
// 静态数据，Phase 4 接入接口后替换
const packagesMap = {
  1: { name: '5G畅享套餐A', specs: { 1: '基础版', 2: '畅享版', 3: '尊享版' }, price: 39 },
  2: { name: '5G畅享套餐B', specs: { 1: '基础版', 2: '畅享版' }, price: 59 },
  3: { name: '家庭融合套餐', specs: { 1: '标准版' }, price: 99 },
  4: { name: '流量畅享套餐', specs: { 1: '基础版' }, price: 49 },
  5: { name: '青春校园卡', specs: { 1: '标准版' }, price: 19 },
  6: { name: '5G尊享套餐', specs: { 1: '基础版' }, price: 199 },
}

const packageId = computed(() => {
  const id = Number(route.query.packageId)
  return id || 0
})

const specId = computed(() => {
  const id = Number(route.query.specId)
  return id || 1
})

const selectedPackage = computed(() => {
  const pkg = packagesMap[packageId.value]
  if (!pkg) return null
  const specPriceMap = {
    1: { 1: 39, 2: 59, 3: 99 },
    2: { 1: 59, 2: 79 },
  }
  const price = (specPriceMap[packageId.value] && specPriceMap[packageId.value][specId.value]) || pkg.price
  return {
    name: pkg.name,
    specName: pkg.specs[specId.value] || '标准版',
    price,
  }
})

const goBack = () => {
  router.back()
}

// ==================== 表单状态 ====================
const form = reactive({
  name: '',
  phone: '',
  remark: '',
})

const errors = reactive({
  name: '',
  phone: '',
})

const submitted = ref(false)

const clearError = (field) => {
  errors[field] = ''
}

const canSubmit = computed(() => {
  return selectedPackage.value && form.name.trim() && form.phone.trim()
})

const handleSubmit = () => {
  // Phase 5 补充完整校验逻辑
  submitted.value = true
  // 简单校验示意
  if (!form.name.trim()) {
    errors.name = '请输入姓名'
    return
  }
  if (!form.phone.trim()) {
    errors.phone = '请输入手机号'
    return
  }
  if (!/^1[3-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = '请输入正确的手机号'
    return
  }
  // 提交成功跳转
  router.push('/booking/success')
}
</script>

<style scoped>
.booking-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 40px;
}

/* ========== 已选套餐 ========== */
.selected-package {
  margin: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
  border-left: 4px solid #1989fa;
}

.selected-package__header {
  margin-bottom: 10px;
}

.selected-package__title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.selected-package__change {
  font-size: 12px;
  color: #1989fa;
  cursor: pointer;
}

.selected-package__name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.selected-package__spec {
  font-size: 12px;
  color: #999;
}

.selected-package__price {
  text-align: right;
}

.price-num {
  font-size: 22px;
  font-weight: 700;
  color: #ee5a24;
}

.price-unit {
  font-size: 11px;
  color: #999;
}

/* ========== 未选套餐 ========== */
.no-package {
  margin: 12px;
  padding: 36px 0;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
}

.no-package__icon {
  font-size: 36px;
  margin-bottom: 8px;
  display: block;
}

.no-package__text {
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
}

.no-package__hint {
  font-size: 12px;
  color: #999;
}

/* ========== 表单卡片 ========== */
.form-card {
  margin: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
}

.form-card__title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-left: 8px;
  border-left: 3px solid #1989fa;
}

/* ========== 表单项 ========== */
.form-item {
  margin-bottom: 18px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-item__label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
}

.form-item__input-wrap {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 12px;
  background: #fafafa;
  transition: border-color 0.2s;
}

.form-item__input-wrap:focus-within {
  border-color: #1989fa;
  background: #fff;
}

.form-item__input-wrap.error {
  border-color: #ee5a24;
}

.form-item__input {
  flex: 1;
  height: 42px;
  font-size: 14px;
  color: #333;
  background: transparent;
}

.form-item__input::placeholder {
  color: #ccc;
}

.form-item__textarea {
  flex: 1;
  height: 72px;
  padding: 10px 0;
  font-size: 14px;
  color: #333;
  background: transparent;
  resize: none;
  line-height: 1.5;
}

.form-item__textarea::placeholder {
  color: #ccc;
}

.form-item__clear {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #ccc;
  background: #eee;
  border-radius: 50%;
  cursor: pointer;
}

.form-item__err-msg {
  margin-top: 4px;
  font-size: 12px;
  color: #ee5a24;
}

.form-item__count {
  margin-top: 4px;
  font-size: 11px;
  color: #ccc;
  text-align: right;
}

/* ========== 提交按钮 ========== */
.booking-bottom {
  margin: 12px;
  text-align: center;
}

.booking-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #1989fa, #0d6efd);
  border-radius: 22px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.booking-btn:active {
  opacity: 0.85;
}

.booking-btn.disabled {
  background: #ccc;
  cursor: not-allowed;
}

.booking-tip {
  margin-top: 10px;
  font-size: 11px;
  color: #ccc;
  line-height: 1.4;
}
</style>
