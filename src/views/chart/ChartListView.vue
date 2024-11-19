<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { listMyChartByPageAPI } from '@/api/chart'
import { message } from 'ant-design-vue'
import VueECharts from '@/components/VueECharts.vue'
import { getLoginUserAPI } from '@/api/user'

const loading = ref<boolean>(false)
const total = ref<number>(0)
const chartList = ref<API.ChartVo[]>([])
const loginUser = ref<API.UserVo>()

// 查询条件
const queryData = ref({
  current: 1,
  pageSize: 10,
  name: '',
})

const getChartList = async () => {
  const res = await listMyChartByPageAPI({
    current: queryData.value.current,
    pageSize: queryData.value.pageSize,
    name: queryData.value.name,
  })
  if (res.code === 200) {
    chartList.value = res.data?.records
    total.value = res.data?.total
  } else {
    message.error(res.message)
  }
}

const getLoginUser = async () => {
  const res = await getLoginUserAPI()
  if (res.code === 200) {
    loginUser.value = res.data
  } else {
    message.error(res.message)
  }
}

onMounted(() => getLoginUser())
onMounted(() => getChartList())
</script>

<template>
  <div id="chartListView">
    <div style="margin-top: 10px">
      <a-input-search
        placeholder="请输入图表名称"
        enter-button
        :loading="loading"
        @search="
          (value: never) => {
            queryData.name = value
            getChartList()
          }
        "
      />
    </div>
    <a-list
      :grid="{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 2,
        xl: 2,
        xxl: 2,
      }"
      item-layout="vertical"
      size="middle"
      :pagination="{
        onChange: (current: number, pageSize: number) => {
          queryData.current = current
          queryData.pageSize = pageSize
          getChartList()
        },
        current: queryData.current,
        pageSize: queryData.pageSize,
        total: total,
        showTotal: (total: number) => `共 ${total} 条`,
      }"
      :data-source="chartList"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.id">
          <a-card style="width: 100%">
            <a-list-item-meta
              :avatar="loginUser?.userAvatar"
              :title="item.name"
              :description="
                item.chartType ? '图表类型' + item.chartType : undefined
              "
            />
            <div style="margin-bottom: 16px" />
            <p>{{ '分析目标' + item.goal }}</p>
            <div style="margin-bottom: 16px" />
            <VueECharts :option="item.genChart" />
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped></style>
