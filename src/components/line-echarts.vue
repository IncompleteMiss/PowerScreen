<template>
  <!-- echarts 的容器 -->
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>

import {onMounted, ref, watch} from 'vue'
import useEcharts from '@/hooks/useEcharts.js'

const props = defineProps({
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    echartsDatas: {
      type: Array,
      default: () => []
    }
  })

  // 拿到 dom 对象
  let divRef = ref(null)
  let Charts = null

  // 监听 echartsDatas 数据的变化
  watch(() => props.echartsDatas, (newValue, oldValue) => {
    setupEcharts(newValue)
  })

  onMounted(() => {
    setupEcharts(props.echartsDatas)   // 第一次走这里
  })

  function setupEcharts(echartsDatas = []) {
    if (!Charts) {
      Charts = useEcharts(divRef.value)
    }
    let option = getOption(echartsDatas)   // 准备数据
    Charts.setOption(option)
  }

  function getOption(echartsDatas) {
    return {
      grid: {
        left: "3%",
        right: "3%",
        top: "20%",
        bottom: "15%",
        containLabel: true, // grid 区域是否包含坐标轴的刻度标签
      },
      legend: {
        right: "center",
        bottom: "5%",
        itemGap: 20,
        itemWidth: 13,
        itemHeight: 12,
        textStyle: {
            color: "#64BCFF",
          },
          icon: "rect",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#20FF89",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: "#64BCFF",
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: "#64BCFF",
            },
          },
        ],
        series: [
          {
            name: echartsDatas[0].name,
            type: "line",
            smooth: true,
            stack: "总量",
            symbolSize: 5,
            showSymbol: false,
            itemStyle: {
              color: "#20FF89",
              lineStyle: {
                color: "#20FF89",
                width: 2,
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#20FF89",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ],
              },
            },
            data: echartsDatas[0].data,
          },
          {
            name: echartsDatas[1].name,
            type: "line",
            smooth: true,
            stack: "总量",
            symbolSize: 5,
            showSymbol: false,
            itemStyle: {
              color: "#EA9502",
              lineStyle: {
                color: "#EA9502",
                width: 2,
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#EA9502",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ],
              },
            },
            data:echartsDatas[1].data,
          },
        ],
    };
  }

</script>

<style scoped>

</style>