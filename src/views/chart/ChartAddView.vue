<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { genChartByAiApI } from '@/api/chart'

const options = ref<SelectProps['options']>([
  {
    value: '折线图',
    label: '折线图',
  },
  {
    value: '柱状图',
    label: '柱状图',
  },
  {
    value: '饼图',
    label: '饼图',
  },
  {
    value: '散点图',
    label: '散点图',
  },
  {
    value: '雷达图',
    label: '雷达图',
  },
])

const formState = ref({
  name: '',
  goal: '',
  chartType: '',
})

const file = ref<File | null>(null)

const beforeUpload = (uploadFile: File) => {
  file.value = uploadFile
  return false
}

// 提交表单数据
const handleSubmit = async () => {
  if (!file.value) {
    message.error('请上传文件！')
    return
  }

  // 封装数据
  const data = new FormData()
  data.append('file', file.value)
  data.append('name', formState.value.name)
  data.append('goal', formState.value.goal)
  data.append('chartType', formState.value.chartType)

  // 调用接口
  const res = await genChartByAiApI(data)
  if (res.code === 200 && res?.data) {
    message.success('分析成功')
  } else {
    message.error(res.message)
  }
}

// 清除表单数据
const clear = () => {
  formState.value = {
    name: '',
    goal: '',
    chartType: '',
  }
  file.value = null
}
</script>

<template>
  <div id="chartAddView">
    <a-card title="新增图表" :bordered="false" class="card-style">
      <a-form :model="formState" @finish="handleSubmit">
        <a-form-item
          label="分析目标"
          name="goal"
          :rules="[{ required: true, message: '请输入分析目标！' }]"
        >
          <a-textarea
            v-model:value="formState.goal"
            placeholder="请输入你的分析需求，比如：分析网站用户的增长情况"
          />
        </a-form-item>
        <a-form-item label="图表名称" style="margin-left: 11px">
          <a-input
            v-model:value="formState.name"
            placeholder="请输入图表名称"
          />
        </a-form-item>
        <a-form-item label="图表类型" style="margin-left: 11px">
          <a-select
            v-model:value="formState.chartType"
            ref="select"
            :options="options"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="原始数据" style="margin-left: 11px">
          <a-upload accept=".xlsx, .xls" :before-upload="beforeUpload">
            <a-button>
              <upload-outlined />
              上传 Excel 文件
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item>
          <div
            style="
              display: flex;
              align-content: center;
              justify-content: center;
            "
          >
            <a-space>
              <a-button type="primary" html-type="submit">提交</a-button>
              <a-button type="default" @click="clear">重置</a-button>
            </a-space>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
#chartAddView {
  display: flex;
  justify-content: center;
  align-content: center;
}

.card-style {
  width: 80%;
  margin-top: 20px;
}
</style>
