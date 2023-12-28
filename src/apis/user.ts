import { request } from '../utils/request'

// 获取用户基础认证信息
export function fetchUserInfo() {
  return request({
    url:`/auth/student/info`,
    method: 'GET',
  })
}
export function fetchcourse(data: any) {
  return request({
    url: `/commodity/display/list`,
    method: 'POST',
    data,
  })
}

// 账号密码登录
export function loginPassword(data: any) {
  return request({
    url: `/auth/login/password`,
    method: 'POST',
    data,
  })
}

// 获取验证码
export function getVerifyCode(params: any) {
  return request({
    url: `/auth/login/verifyCode`,
    method: 'GET',
    params,
  })
}

// 验证码登录
export function verifyCodeLogin(params: any, data: any) {
  return request({
    url: `/auth/login/mobile?sessionKey=${params.sessionKey}&code=${params.code}`,
    method: 'POST',
    data: data,
  })
}

// 获取渠道id
export function fetchChannelId() {
  return request({
    url: `/base/app/channel/platform`,
    method: 'GET',
  })
}