import * as echarts from 'echarts'
import { onUnmounted } from 'vue'

export default function useEcharts(divEl) {

  const echartsInstance = echarts.init(divEl, null, { renderer: 'svg' })

  onUnmounted(() => {
    echarts.dispose(echartsInstance)   // 销毁实例
  })

  // 为了方便 该 hooks 的使用
  function setOption(option) {
    echartsInstance.setOption(option)
  }

  function resizeEcharts() {
    echartsInstance.resize()
  }

  return {
    echartsInstance,
    setOption,
    resizeEcharts
  }

}
