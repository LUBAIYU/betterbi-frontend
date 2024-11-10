<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '@/router/routes'

const router = useRouter()

// 菜单选中项
const current = ref<string[]>(['/'])

// 更新菜单选中项
router.afterEach(to => {
  current.value = [to.path]
})

// 可供选择的菜单项
const menuItems = computed(() => {
  return routes.filter(route => {
    return !route.meta?.hidden
  })
})

// 生成菜单项
const items = computed(() => {
  return menuItems.value.map(item => {
    return {
      key: item.path,
      label: item.name,
      title: item.name,
    }
  })
})
</script>

<template>
  <div id="globalHeader">
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
  </div>
</template>

<style scoped>
#globalHeader {
  flex: 1;
}
</style>
