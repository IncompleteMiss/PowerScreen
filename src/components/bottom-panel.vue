<template>
  <div class="bottom-panel">
    <template v-for="item in panelItems" :key="item">
      <div :class="['item', `panel${item.id}`]">
        <div class="panel-left">
          <div class="title"> {{ item.title }} </div>
          <!-- 数据动画 -->
          <span :id="`total-num-${item.id}`" class="number">
            {{ item.totalNum }}
          </span>
          <span class="unit"> {{ item.unit }} </span>
        </div>
        <div class="panel-right">
          <span :class="['triangle', item.isUp ? 'up-triangle': 'down-triangle']"></span>
          <!-- 数据动画 -->
          <span :id="`percentage-num-${item.id}`" class="percentage">
            {{ item.percentage }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>

  import { nextTick, watch } from 'vue'

  import { CountUp } from 'countup.js'

  const props = defineProps({
    panelItems: {
      type: Array,
      default: () => []
    }
  })

  watch(() => props.panelItems, (newValue, oldValue) => {
    // 在下一次 dom 更新完成之后会回调
    nextTick(() => {
      startAnimation(newValue)
    })
  })

  // 给数字执行滚动的动画
  function startAnimation(panelItems = []) {
    // 等 dom 更新完成之后执行
    const option1 = {
      decimalPlaces: 1,   // 保留一位小数点
      duration: 2,
      useGrouping: false   // 1000 -> 1,000
    }
    const option2 = {
      decimalPlaces: 1,   // 保留一位小数点
      duration: 2,
      useGrouping: false,
      suffix: '%'
    }

    panelItems.forEach((item) => {
      new CountUp(`total-num-${item.id}`, item.totalNum, option1).start()
      new CountUp(`percentage-num-${item.id}`, item.percentage, option2).start()
    })
  }

</script>

<style scoped>

  .bottom-panel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .bottom-panel .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;

    flex: 1;
    height: 100%;
    padding: 0 10px 0 35px;
  }

  .bottom-panel .panel-left {
    font-size: 16px;
    color: #ffffff;
    opacity: 0.8;
  }

  .bottom-panel .panel-left .number {
    font-size: 36px;
    font-weight: bold;
    color: #23aeff;
    line-height: 60px;
  }

  .bottom-panel .panel-left .unit {
    font-size: 18px;
    color: #23aeff;
  }

  .bottom-panel .panel-right {
    margin-top: 35px;
    margin-right: 15px;
  }

  .bottom-panel .panel1 .panel-right .up-triangle {
    display: inline-block;
    margin-bottom: 4px;
    width: 0;
    height: 0;
    border-bottom: 8px solid #c70013;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }

  .bottom-panel .panel1 .panel-right .percentage {
    color: #c70013;
  }

  .bottom-panel .panel2 .panel-right .up-triangle {
    display: inline-block;
    margin-bottom: 4px;
    width: 0;
    height: 0;
    border-bottom: 8px solid #c70013;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }

  .bottom-panel .panel2 .panel-right .percentage {
    color: #c70013;
  }

  .bottom-panel .panel3 .panel-right .down-triangle {
    display: inline-block;
    margin-bottom: 1px;
    width: 0;
    height: 0;
    border-top: 8px solid #37a73f;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }

  .bottom-panel .panel3 .panel-right .percentage {
    color: #37a73f;
  }

</style>