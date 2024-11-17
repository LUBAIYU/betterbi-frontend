import request from '@/util/request'

/**
 * 新增图表
 * @param data
 */
export const addChartAPI = (data: API.ChartAddParams) => {
  return request({
    method: 'POST',
    url: '/chart/add',
    data,
  }) as Promise<API.Result>
}

/**
 * 删除图表
 * @param id
 */
export const deleteChartByIdAPI = (id: string) => {
  return request({
    method: 'DELETE',
    url: `/chart/delete/${id}`,
  }) as Promise<API.Result>
}

/**
 * 修改图表
 * @param data
 */
export const updateChartByIdAPI = (data: API.ChartUpdateParams) => {
  return request({
    method: 'PUT',
    url: '/chart/update',
    data,
  }) as Promise<API.Result>
}

/**
 * 根据ID获取图表信息
 * @param id
 */
export const getChartByIdAPI = (id: string) => {
  return request({
    method: 'GET',
    url: `/chart/get/${id}`,
  }) as Promise<API.Result>
}

/**
 * 分页获取当前用户图表列表
 * @param data
 */
export const listMyChartByPageAPI = (data: API.ChartQueryParams) => {
  return request({
    method: 'POST',
    url: '/chart/my/page',
    data,
  }) as Promise<API.Result>
}

/**
 * 分页获取所有图表列表
 * @param data
 */
export const listChartsByPageAPI = (data: API.ChartQueryAdminParams) => {
  return request({
    method: 'POST',
    url: '/chart/page',
    data,
  }) as Promise<API.Result>
}

/**
 * 根据AI生成图表
 * @param data
 */
export const genChartByAiApI = (data: FormData) => {
  return request({
    method: 'POST',
    url: '/chart/genChart',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }) as Promise<API.Result>
}
