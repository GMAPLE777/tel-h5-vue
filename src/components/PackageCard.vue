<template>
  <div class="package-card" @click="handleClick">
    <div class="package-card__header">
      <h3 class="package-card__name text-ellipsis">{{ data.name }}</h3>
      <span v-if="data.tag" class="package-card__tag">{{ data.tag }}</span>
    </div>
    <div class="package-card__body flex-between">
      <div class="package-card__info">
        <p class="package-card__desc text-ellipsis" v-if="data.desc">{{ data.desc }}</p>
        <div class="package-card__features" v-if="data.features">
          <span v-for="(f, i) in data.features" :key="i" class="feature-item">{{ f }}</span>
        </div>
      </div>
      <div class="package-card__price">
        <span class="price-num">{{ data.price }}</span>
        <span class="price-unit">元/月</span>
      </div>
    </div>
    <div class="package-card__arrow">&gt;</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    // { id, name, tag, desc, price, features, thumbnail }
  },
})

const router = useRouter()

const handleClick = () => {
  router.push(`/detail/${props.data.id}`)
}
</script>

<style scoped>
.package-card {
  position: relative;
  margin: 0 12px 12px;
  padding: 14px 12px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: transform 0.2s;
}

.package-card:active {
  transform: scale(0.98);
}

.package-card__header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.package-card__name {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-right: 8px;
}

.package-card__tag {
  flex-shrink: 0;
  padding: 2px 6px;
  font-size: 10px;
  color: #fff;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border-radius: 3px;
}

.package-card__info {
  flex: 1;
  min-width: 0;
}

.package-card__desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 6px;
}

.package-card__features {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.feature-item {
  padding: 2px 6px;
  font-size: 10px;
  color: #1989fa;
  background: #e8f4ff;
  border-radius: 3px;
}

.package-card__price {
  flex-shrink: 0;
  text-align: right;
  margin-left: 10px;
}

.price-num {
  font-size: 20px;
  font-weight: 700;
  color: #ee5a24;
}

.price-unit {
  font-size: 11px;
  color: #999;
}

.package-card__arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #ccc;
}
</style>
