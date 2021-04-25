<template>
  <a-form>
    <a-form-item label="最高学历">
      <a-radio-group>
        <a-radio-group
          :options="levelTypes"
          :value="data.level"
          @change="changeLevel($event)"
        />
      </a-radio-group>
    </a-form-item>
    <a-form-item label="最高学位">
      <a-radio-group
        :options="degreeTypes"
        :value="data.degree"
        @change="changeDegree($event)"
      />
    </a-form-item>
    <a-form-item label="所在城市">
      <a-radio-group
        :options="cityTypes"
        :value="data.city"
        @change="changeCity($event)"
      />
    </a-form-item>
    <a-form-item label="取得时间">
      <a-date-picker
        :locale="DatePickerLocale_zh_CN"
        :value="moment(data.time, dateFormat)"
        @change="changeTime($event)"
      />
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import DataUtils from "@/data/DataUtils.ts"
import IDataEducation from "@/type/IDataEducation.ts"
import moment from "moment"
import { defineComponent, inject } from "vue"
import { CityType, DegreeType, LevelType } from "../type/ITypes"
export default defineComponent({
  name: "ExamEducation",
  setup(props, content) {
    const DatePickerLocale_zh_CN=inject('DatePickerLocale_zh_CN')
    const data = inject<IDataEducation>("educationData")
    const dateForamt = DataUtils.DayFormat
    const cityTypes = DataUtils.getOptionsFromEnum(CityType)
    const degreeTypes = DataUtils.getOptionsFromEnum(DegreeType)
    const levelTypes = DataUtils.getOptionsFromEnum(LevelType)
    const changeData = (prop: string, val: string) => {
      if (data) {
        DataUtils.changeEducationData(data, prop, val)
        emitEvent()
      }
    }
    const changeCity = (event: any) => {
      if (event.target && event.target.value) {
        let val = event.target.value as string
        changeData("city", val)
      }
    }
    const changeDegree = (event: any) => {
      if (event.target && event.target.value) {
        let val = event.target.value as string
        changeData("degree", val)
      }
    }
    const changeLevel = (event: any) => {
      if (event.target && event.target.value) {
        let val = event.target.value as string
        changeData("level", val)
      }
    }
    const changeTime = (date: moment.Moment) => {
      let val = date.format(dateForamt)
      changeData("time", val)
    }
    const emitEvent = () => {
      content.emit("change-data", 2)
    }
    return {
      DatePickerLocale_zh_CN,
      data,
      dateForamt,
      cityTypes,
      degreeTypes,
      levelTypes,
      // events
      changeDegree,
      changeLevel,
      changeCity,
      changeTime,
      moment,
    }
  },
})
</script>
<style scoped></style>
