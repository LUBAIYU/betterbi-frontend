declare namespace API {
  type Result<T> = {
    code: number
    data: T
    message: string
  }

  type UserLoginParams = {
    userAccount: string
    userPassword: string
  }

  type UserRegisterParams = {
    userAccount: string
    userPassword: string
    checkPassword: string
  }

  type UserPageParams = {
    current: number
    pageSize: number
    userAccount?: string
    userName?: string
    userRole?: number
  }

  type UserUpdateParams = {
    id: string
    userAccount?: string
    userPassword?: string
    userName?: string
    userAvatar?: string
    userRole?: number
  }

  type ChartAddParams = {
    goal: string
    chartData: string
    chartType: string
  }

  type ChartUpdateParams = {
    id: string
    goal?: string
    chartData?: string
    chartType?: string
  }

  type ChartQueryParams = {
    current: number
    pageSize: number
    id?: string
    name?: string
    goal?: string
    chartType?: string
  }

  type ChartQueryAdminParams = {
    current: number
    pageSize: number
    id?: string
    goal?: string
    chartType?: string
    userId?: string
  }

  type UserVo = {
    id: string
    userAccount: string
    userName: string
    userAvatar: string
    userRole: number
    createTime: Date
    updateTime: Date
  }

  type AiChartVo = {
    chartId: string
    genChart: string
    genResult: string
  }

  type ChartVo = {
    id: string
    name: string
    goal: string
    chartData: string
    chartType: string
    genChart: string
    genResult: string
    createTime: Date
    updateTime: Date
  }

  type PageResponse = {
    total: number
    records: never[]
  }
}
