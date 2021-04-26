<template>
  <a-form>
    <a-form-item label="出生日期">
      <a-date-picker
        :locale="DatePickerLocale_zh_CN"
        :value="moment(data.birthDay, dateFormat)"
        @change="changeBirthday($event)"
        :disabled="true"
      />
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue"
import moment from "moment"
import DataUtils from "@/data/DataUtils.ts"
import { default as IDataOthers } from "@/type/IDataOthers.ts"
export default defineComponent({
  name: "ExamAge",
  setup() {
    const DatePickerLocale_zh_CN=inject('DatePickerLocale_zh_CN')
    const dateFormat = DataUtils.DayFormat
    let data = inject<IDataOthers>("othersData")
    const changeBirthday = (date: moment.Moment) => {
      let val = date.format(dateFormat)
      if (val && data) {
        DataUtils.changeOthersData(data, "birthDay", val)
      }
    }
    return {
      DatePickerLocale_zh_CN,
      dateFormat,
      data,
      changeBirthday,
      //
      moment,
    }
  },
})
</script>
<style scoped></style>
