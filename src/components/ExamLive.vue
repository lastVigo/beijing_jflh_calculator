<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #startMonthHead> 开始时间 </template>
    <template #endMonthHead> 结束时间 </template>

    <template #startMonthContent="{ text: startMonth, index }">
      <a-date-picker
        :locale="DatePickerLocale_zh_CN"
        :value="moment(startMonth, dateFormat)"
        @change="changeStartMonth($event, index)"
      />
    </template>
    <template #endMonthContent="{ text: endMonth, index }">
      <a-date-picker
        :locale="DatePickerLocale_zh_CN"
        :value="moment(endMonth, dateFormat)"
        @change="changeEndMonth($event, index)"
      />
    </template>

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
    <template #ltype="{ text: ltype, index }">
      <!-- {{type}} -->
      <a-radio-group>
        <a-radio-group
          :options="selectorData2"
          :value="ltype"
          @change="changeType2($event, index)"
        />
      </a-radio-group>
    </template>

    <template #action="{ index }">
      <a-button type="primary" @click="delItem(index)">删除</a-button>
    </template>
    <template #footer>
      <div class="footer">
        <a-button type="primary" @click="addItem">添加</a-button>
      </div>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, inject, reactive } from "vue"
import { default as IDataLive } from "@/type/IDataLive.ts"
import moment from "moment"
import DataUtils from "@/data/DataUtils.ts"
import { LiveType, DistrictType } from "@/type/ITypes.ts"
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
    title: "居住类别",
    dataIndex: "itype",
    key: "itype",
    slots: { title: "typeHead", customRender: "typeContent" },
  },
  {
    title: "自有房屋坐落",
    dataIndex: "ltype",
    key: "ltype",
    slots: { title: "ltypeHead", customRender: "ltype" },
  },

  {
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
]
export default defineComponent({
  name: "ExamLive",
  setup(props, content) {
    const DatePickerLocale_zh_CN=inject('DatePickerLocale_zh_CN')
    const dateFormat = DataUtils.MonthFormat
    // 居住类型数据
    const selectorData = DataUtils.getOptionsFromEnum(LiveType)
    // 居住区域数据
    const selectorData2 = DataUtils.getOptionsFromEnum(DistrictType)
    const data = inject<Array<IDataLive>>("liveData")
    const changeData = (index: number, prop: string, value: string) => {
      if (data && data.length > index) {
        DataUtils.changeLiveData(data, index, prop, value)
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
          itype: LiveType.Rental,
          ltype: DistrictType.In,
        })
        emitEvent()
      }
    }
    const changeType = (event: any, index: number) => {
      let val = event.target.value as string
      changeData(index, "itype", val)
    }
    const changeType2 = (event: any, index: number) => {
      let val = event.target.value as string
      changeData(index, "ltype", val)
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
      content.emit("change-data", 1)
    }
    return {
      DatePickerLocale_zh_CN,
      columns,
      data,
      selectorData,
      selectorData2,
      dateFormat,
      //events
      changeData,
      delItem,
      addItem,
      changeType,
      changeType2,
      changeStartMonth,
      changeEndMonth,
      moment,
    }
  },
})
</script>
<style scoped>
.footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
