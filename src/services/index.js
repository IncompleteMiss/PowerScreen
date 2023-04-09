import axiosRequest from './request'

/*
* 获取新能源充电桩页面的数据( get请求，不需要参数 )
* 为什么这个接口不会出现跨域问题：cors( 在后台已经处理跨域问题了 )
* */

export function getPowerScreenData() {
  return axiosRequest.get({
    url: '/powerscreen'
  })
}