<template>
  <div class="content">
    <h1>申请资质核对</h1>
    <a-divider />
    <a-card>
      <a-form>
        <a-form-item label="计算积分年度">
          <a-month-picker
            :locale="DatePickerLocale_zh_CN"
            placeholder="点击选择"
            :format="dateFormat"
            :disabledDate="disabledDateBefore"
            v-model:value="computeTime"
            disabled="true"
          />
        </a-form-item>
        <a-form-item label="居住证">
          <a-checkbox v-model:checked="isResidencePermit">
            在【{{ sLastYearLastDay }}】日之前已经取得北京市居住证</a-checkbox
          >
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group>
            <a-radio-group :options="selectorData" v-model:value="gender" />
          </a-radio-group>
        </a-form-item>
        <a-form-item label="出生日期">
          <a-date-picker
            v-model:value="birthDay"
            :locale="DatePickerLocale_zh_CN"
            :disabledDate="disabledDateAfter"
            value="1980-02-27"
          />
        </a-form-item>
        <a-form-item label="社保">
          <a-checkbox v-model:checked="isInsurance">
            连续缴费记录覆盖【{{ sSevenYearsBefore }}】~【{{
              sLastYearLastDay
            }}】，且目前社保缴费状态正常</a-checkbox
          >
        </a-form-item>
        <a-form-item label="刑事犯罪记录">
          <a-switch
            checked-children="有"
            un-checked-children="无"
            v-model:checked="isCrime"
          />
        </a-form-item>
      </a-form>
      <a-row justify="center" class="btns">
        <a-button type="primary" @click="goNext" :disabled="btnDisable"
          >继续</a-button
        >
      </a-row>
    </a-card>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch ,inject} from "vue"
import { Moment, locale } from "moment"
import { YEAR } from "@/data/config.ts"
import DataUtils from "@/data/DataUtils.ts"
import Rules from "@/core/Rules.ts"
import moment from "moment"
import { GenderTypes } from "@/type/ITypes"
locale("zh-cn")
export default defineComponent({
  name: "Start",
  setup() {
    const DatePickerLocale_zh_CN=inject('DatePickerLocale_zh_CN')
    const isCrime = ref<boolean>(false)
    const btnDisable = ref<boolean>(true)
    const birthDay = ref<Moment>()
    const disabledDateBefore = (current: Moment) => {
      return current && current < moment().endOf("day")
    }
    const disabledDateAfter = (current: Moment) => {
      return current && current > moment().endOf("day")
    }
    let now: Moment = moment(YEAR, DataUtils.YearFormat)
    const lastYearLastDay: Moment = Rules.getBaseDay()
    const sLastYearLastDay: string = Rules.getBaseDayStr()
    const sevenYearsBefore: Moment = moment(lastYearLastDay)
      .subtract(7, "y")
      .endOf("year")
    const sSevenYearsBefore: string = sevenYearsBefore.format(
      DataUtils.DayFormat
    )
    const computeTime = ref<Moment>(now)
    const isResidencePermit = ref<boolean>(false)
    const isInsurance = ref<boolean>(false)
    const selectorData = DataUtils.getOptionsFromEnum(GenderTypes)
    const gender = ref<string>("男")
    watch(
      [isCrime, isInsurance, isResidencePermit, gender, birthDay],
      ([nIsCrime, nIsInsurance, nIsResidencePermit, nGender, nBirthDay]) => {
        // 生日有值，选项选中
        if (nBirthDay && !nIsCrime && nIsInsurance && nIsResidencePermit) {
          //
          // 没有超过法定退休年龄
          if (!Rules.isRetire(nBirthDay, lastYearLastDay, nGender)) {
            btnDisable.value = false
          } else {
            btnDisable.value = true
          }
        } else {
          btnDisable.value = true
        }
      }
    )
    return {
      DatePickerLocale_zh_CN,
      computeTime,
      sLastYearLastDay,
      sSevenYearsBefore,
      isInsurance,
      isResidencePermit,
      birthDay,
      gender,
      isCrime,
      selectorData,
      dateFormat: DataUtils.YearFormat,
      btnDisable,
      // 计算年度不能早于今年
      disabledDateBefore,
      // 出生日期不能在今天以后
      disabledDateAfter,
    }
  },
  methods: {
    goNext() {
      this.$router.push(
        `/Exam/${this.birthDay.format(DataUtils.DayFormat)}/${this.gender}`
      )
    },
  },
})
</script>
<style scoped>
.btns{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
