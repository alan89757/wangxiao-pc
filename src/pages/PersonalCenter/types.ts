import { ReactElement } from "react"

export default interface TabItem {
  component: ReactElement
  name: string
  isActive: boolean
}

export interface Course {
  isExpired: number
  k: string
  useTime: string
  v: string
  certificateId?: string
}

export interface CourseResponse {
  current: number
  data: Course[]
  pages: number
  total: number
}

export interface Tab {
  key: string
  value: string
}

//获取项目标签返回
export interface TabsResponse {
  body: Tab[]
  code: number
  msg: string
}
