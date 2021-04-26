<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #startMonthHead> 开始时间 </template>
    <template #endMonthHead> 结束时间 </template>
    <template #startMonthContent="{ text: startMonth, index }">
      <a-month-picker
        :locale="DatePickerLocale_zh_CN"
        :value="moment(startMonth, dateFormat)"
        :disabled-date="disabledDate"
        @change="changeStartMonth($event, index)"
      />
    </template>
    <template #endMonthContent="{ text: endMonth, index }">
      <a-month-picker
        :locale="DatePickerLocale_zh_CN"
        :value="moment(endMonth, dateFormat)"
        :disabled-date="disabledDate"
        @change="changeEndMonth($event, index)"
      />
    </template>
    <template #typeHead> 工作区域 </template>
    <template #typeContent="{ text: itype, index }">
      <!-- {{type}} -->
      <a-radio-group>
        <a-radio-group
          :options="selectorData"
          :value="itype"
          @change="changeType($event, index)"
        />
      </a-radio-group>
    </template>
    <template #action="{ index }">
      <a-button type="primary" @click="delItem(index)">删除</a-button>
    </template>
    <template #footer>
      <div class="footer">
        <div>填写连续的社保缴费时间，不含补缴</div>
        <a-button type="primary" @click="addItem">添加</a-button>
      </div>
    </template>
  </a-table>
</template>

<script lang="ts">
const columns = [
  {
    dataIndex: "startMonth",
    key: "startMonth",
    slots: { title: "startMonthHead", customRender: "startMonthContent" },
  },
  {
    title: "结束时间",
    dataIndex: "endMonth",
    key: "endMonth",
    slots: { title: "startMonthHead", customRender: "endMonthContent" },
  },
  {
    title: "社保类别",
    dataIndex: "itype",
    key: "itype",
    slots: { title: "typeHead", customRender: "typeContent" },
  },
  {
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
]

import DataUtils from "@/data/DataUtils.ts"
import Rules from "@/core/Rules.ts"
import IDataEmployment from "@/type/IDataEmployment.ts"
import {
  LiveType,
  CityType,
  DegreeType,
  LevelType,
  DistrictType,
} from "@/type/ITypes"
import moment from "moment"
import { defineComponent, inject } from "vue"
export default defineComponent({
  name: "ExamEmployment",
  setup(props, content) {
    const DatePickerLocale_zh_CN=inject('DatePickerLocale_zh_CN')
    const dateFormat = DataUtils.MonthFormat
    // 保险类型数据
    const selectorData = DataUtils.getOptionsFromEnum(DistrictType)
    const data = inject<Array<IDataEmployment>>("employmentData")

    // events
    const changeData = (index: number, prop: string, value: string) => {
      if (data && data.length > index) {
        DataUtils.changeEmploymentData(data, index, prop, value)
        emitEvent()
      }
    }
    const delItem = function (index: number) {
      //console.log(index)
      if (data && data.length > index) {
        data.splice(index, 1)
        emitEvent()
      }
    }
    const addItem = () => {
      if (data) {
        let len = data.length
        data.push({
          key: len,
          startMonth: moment().format(dateFormat),
          endMonth: moment().format(dateFormat),
          itype: DistrictType.In,
        })
        emitEvent()
      }
    }
    const changeType = (event: any, index: number) => {
      let val = event.target.value as string
      changeData(index, "itype", val)
    }

    const changeStartMonth = (date: moment.Moment, index: number) => {
      let val = date.format(dateFormat)
      changeData(index, "startMonth", val)
    }
    const changeEndMonth = (date: moment.Moment, index: number) => {
      let val = date.format(dateFormat)
      changeData(index, "endMonth", val)
    }
    const emitEvent = () => {
      content.emit("change-data", 0)
    }
    const disabledDate = (current: moment.Moment) => {
      return (
        current &&
        (current < Rules.Insurance_Start_Date ||
          current.endOf("month") > Rules.Last_Year_End_Date)
      )
    }
    return {
      DatePickerLocale_zh_CN,
      columns,
      data,
      selectorData,
      dateFormat,
      //events
      delItem,
      addItem,
      changeType,
      changeStartMonth,
      changeEndMonth,
      moment,
      disabledDate,
    }
  },
})
</script>
<style scoped>
.footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
