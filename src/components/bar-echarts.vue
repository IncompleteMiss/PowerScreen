<template>
  <!-- echarts 的容器 -->
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>

import { onMounted, ref, watch } from 'vue'
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
  let myCharts = null

  // 监听 echartsDatas 的变化
  watch(() => props.echartsDatas, (newValue, oldValue) => {
    setupEcharts(newValue)
  })

  onMounted(() => {
    setupEcharts(props.echartsDatas)
  })

  function setupEcharts(echartsDatas = []) {
    if (!myCharts) {
      myCharts = useEcharts(divRef.value)
    }

    let option = getOption(echartsDatas)   // 准备数据
    myCharts.setOption(option.option)

    // 1.实现提示框轮播的功能
    setInterval(function () {
      autoToolTip(option.barLength, myCharts.echartsInstance);
    }, 2000);

    let index = 0;

    function autoToolTip(barLength, charts) {
      index ++;
      if (index >= barLength) {
        index = 0;
      }
      // 1.显示提示框
      charts.dispatchAction({
        type: "showTip", // 触发的action type
        seriesIndex: 0, // 系列的 索引
        dataIndex: index,// 数据项的 索引
        position: "top", // top
      });
    }
  }

  function getOption(echartsDatas = []) {
    const category = echartsDatas.map((item) => {
      return item.name
    })
    const categoryData = echartsDatas.map((item) => {
      return item.value
    })

    const barLength = categoryData.length

    let option =  {
      grid: {
        left: "5%",
        right: "5%",
        top: "30%",
        bottom: "5%",
        containLabel: true, // grid 区域是否包含坐标轴的刻度标签
      },
      tooltip: {},
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: "#42A4FF",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "white",
        },

        data: category,
      },
      yAxis: {
        name: "个",
        nameTextStyle: {
          color: "white",
          fontSize: 13,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#42A4FF",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#42A4FF",
          },
        },
        axisLabel: {
          color: "white",
        },
      },
      series: [
        {
          name: "销量",
          type: "bar",
          barWidth: 17,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#01B1FF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#033BFF", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          data: categoryData,
        },
      ],
    };

    return {
      option,
      barLength
    }
  }

</script>

<style scoped>

</style>