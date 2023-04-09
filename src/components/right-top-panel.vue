<template>
  <div class="right-top-panel">
    <!-- 1.水球 -->
    <water-ball class="right-water-ball" :current-percentage="percentage"/>
    <!-- 2.图例 -->
    <div class="legend">
      <template v-for="item in panelItems" :key="item">
        <div class="legend-name">
          <span :class="['dot', `area${item.id}`]"></span>
          <span class="name"> {{ item.name }} </span>
          <span class="percentage">{{ item.percentage }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>

  import WaterBall from '@/components/water-ball.vue'

  const props = defineProps({
    percentage: {
      type: Number,
      default: 0
    },
    panelItems: {
      type: Array,
      default: () => []
    }
  })

</script>

<style lang="less" scoped>

  .right-top-panel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .right-water-ball {
      width: 269px;
      height: 200px;
      margin-top: 50px;
      margin-left: 40px;
    }

    .legend {
      flex: 1;

      .legend-name {
        margin-top: 23px;
        margin-left: 40px;

        span {
          display: inline-block;
          font-size: 20px;
          margin-right: 11px;
        }

        .dot {
          width: 17px;
          height: 17px;
          border-radius: 50%;
        }

        .area1 {
          background-color: #209393;
        }

        .area2 {
          background-color: #1a54a5;
        }

        .area3 {
          background-color: #85caf0;
        }

        .area4 {
          background-color: #f5b64a;
        }

        .area5 {
          background-color: #ee792e;
        }

        .name {
          color: #ffffff;
        }

        .percentage {
          color: #0cd2ea;
        }
      }
    }
  }

</style>