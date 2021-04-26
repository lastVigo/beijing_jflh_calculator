<template>
  <a-card title="未来积分预估">
    <div id="cc"></div>
    <a-divider />
    <a-form>
      <a-form-item label="预估年数">
        <a-input-number
          :min="2"
          :max="20"
          v-model:value="yearNum"
          @change="conditionChange"
        />
      </a-form-item>
      <a-form-item label="预估条件">
        <a-radio-group
          :options="conditions"
          v-model:value="curCondtion"
          @change="conditionChange"
        />
      </a-form-item>
      <a-form-item label="未成年子女出生日期">
        <a-date-picker 
          :locale="DatePickerLocale_zh_CN"
          v-model:value="childBirthday"
          @change="conditionChange"
        />
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script lang="ts">
import { defineComponent, inject, reactive, ref, toRefs, toRaw } from "vue";
// import {DatePickerLocale_zh_CN} from '@/data/config.ts'
import { YEAR } from "@/data/config";
import IScoreInfo from "@/type/IScoreInfo";
import moment from "moment";
import { LiveType } from "@/type/ITypes.ts";
import Rules from "@/core/Rules.ts";
import { scort_levels } from "@/data/config.ts";
import * as echarts from 'echarts/core';
/** 
 * */
import {
    BarChart,
    // 系列类型的定义后缀都为 SeriesOption
    // BarSeriesOption,

} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    MarkLineComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components'
import {
    CanvasRenderer
} from 'echarts/renderers'

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer,MarkLineComponent,LegendComponent]
)

export default defineComponent({
  name: "Charts",
  props: {
    birthday: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  setup(props, content) {
    const DatePickerLocale_zh_CN=inject('DatePickerLocale_zh_CN')
    const realData: { detail: IScoreInfo } = inject<{ detail: IScoreInfo }>(
      "scoreInfo"
    )
    const curCondtion = ref<string>("1")
    const yearNum = ref<number>(5)
    const childBirthday = ref<string>("")
    const chartOption= {
      backgroundColor: "white",

      tooltip: {},
      xAxis: {
        data: [YEAR],
      },
      yAxis: { min: 70, max: 140 },
      series: [
        {
          name: "得分",
          type: "bar",
          data: [
            {
              value: realData.detail.tot_score,
              itemStyle: {
                borderType: "solid",
              },
            },
          ],
          markLine: {
            label: {
              show: true,
              position: "end",
            },
            data: [
              {
                name: "2020年落户最低分值",
                yAxis: scort_levels.get("2020"),
                itemStyle: {
                  color: "red",
                  borderType: "dashed",
                },
              },
              {
                name: "2019年落户最低分值",
                yAxis: scort_levels.get("2019"),
                itemStyle: {
                  color: "purple",
                },
              },
              {
                name: "2018年落户最低分值",
                yAxis: scort_levels.get("2018"),
                itemStyle: {
                  color: "blue",
                  symbol: "none",
                },
              },
            ],
          },
        },
      ],
    }

    return {
      realData,
      conditions: [
        { label: "自有住房-城六区", value: "1" },
        { label: "自有住房-城六区外", value: "3" },
        { label: "自有住房-城六区外-工作在非六城区", value: "2" },
        { label: "租住", value: "4" },
      ],
      curCondtion,
      yearNum,
      childBirthday,
      chartOption,
      DatePickerLocale_zh_CN
    }
  },
  methods: {
    /**
     * 1:自有住房-城六区 住房+1
     * 2:自有住房-非城六区-职住 住房+1 职住+3
     * 3:自有住房-非城六区-住 住房+1 职住+2
     * 4:租房 住房+0.5
     */
    countFuture: function (
      flag: string,
      yearNum: number,
      childBirthday: string
    ): any {
      let rst: [string[], number[], string] = Rules.getFutureScores(
        yearNum,
        this.realData.detail,
        this.birthday,
        this.gender,
        childBirthday,
        flag
      )
      let years: string[] = rst[0]
      let scores: number[] = rst[1]
      let lastYear: string = rst[2]

      interface IScoreData {
        value: number
        itemStyle: {
          borderType: string
        }
      }
      let scoresItems: IScoreData[] = []

      let newOption = Object.assign({}, this.chartOption)
      let oData: Array<any> = Array.from(newOption.series[0].markLine.data)
      for (let i = 0; i < yearNum; i++) {
        let tempObj = {
          value: scores[i],
          itemStyle: {
            borderType: "dashed",
          },
        }
        scoresItems.push(tempObj)
      }
      if (lastYear !== "") {
        let markLineData = {
          name: "子女随同落户最后申报年度",
          xAxis: lastYear,
          itemStyle: {
            color: "purple",
            symbol: "none",
          },
          silent: true,
        }
        oData.push(markLineData)
      }
      newOption.xAxis.data = years
      newOption.series[0].data = scoresItems
      newOption.series[0].markLine.data = oData
      return newOption
    },
    conditionChange: function () {
      let option= this.countFuture(this.curCondtion, this.yearNum, this.childBirthday)
      let chartDiv = document.getElementById("cc")
      let chart=echarts.getInstanceByDom(chartDiv)
      if(!chart){
          chart=echarts.init(chartDiv)
      }else{
         chart.clear();
      }
      chart.setOption(option, {notMerge:true})
    },
  },
  mounted: function () {
    this.conditionChange()
  },
})
</script>
<style scoped>
#cc {
  width: 100%;
  height: 50vh;
}
</style>
