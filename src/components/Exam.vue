<template>
  <div class="content">
    <h1>北京市{{ YEAR }}年度积分落户计算器</h1>
    <h1>总积分</h1>
    <div class="totalScore">
      <AnimationNum :num="totalScore" />
    </div>
    <div class="btns">
      <a-button type="primary" @click="showScoreDetail">查看积分明细</a-button>
      <a-button type="primary" @click="showCharts">图表分析</a-button>
    </div>
    <div class="cards">
      <template v-for="(item, index) in data" :key="index">
        <a-card :title="item.title" class="exam-item">
          <template #extra>
          
            <a-button type="link" @click="editBy(index)">操作</a-button>
          </template>
          <div class="itemSore">
            <AnimationNum :num="item.score" />
          </div>
        </a-card>
      </template>
    </div>
    <a-modal
      v-model:visible="isShowForm"
      :title="editTitle"
      width="1000px"
      cancel-text=""
      ok-text="关闭"
      closable="false"
      mask="true"
      maskClosable="false"
      @ok="afterCloseHandler"
      @afterClose="afterCloseHandler"
    >
      <component
        v-bind:is="currentFormComName"
        @change-data="changeDataHandler"
      />
      <template #footer>
        <a-button type="primary" @click="isShowForm = false">关闭</a-button>
      </template>
    </a-modal>
  </div>
  <a-drawer
    title="积分明细"
    placement="left"
    :width="900"
    :closable="false"
    v-model:visible="isShowSorceDetail"
    destroyOnClose="true"
  >
    <ScoreDetail />
  </a-drawer>
  <a-drawer
    title="图表分析"
    placement="right"
    :width="900"
    :closable="false"
    v-model:visible="isShowcharts"
    destroyOnClose="true"
  >
    <Charts :gender="inputedGender" :birthday="inputedBirthDay" />
  </a-drawer>
</template>
<script lang="ts">
import Charts from "@/components/Charts.vue"
import ExamAge from "@/components/ExamAge.vue"
import ExamEducation from "@/components/ExamEducation.vue"
import ExamEmployment from "@/components/ExamEmployment.vue"
import ExamHonor from "@/components/ExamHonor.vue"
import ExamInnovate from "@/components/ExamInnovate.vue"
import ExamLawAbiding from "@/components/ExamLawAbiding.vue"
import ExamLive from "@/components/ExamLive.vue"
import ExamSuburb from "@/components/ExamSuburb.vue"
import ExamTaxes from "@/components/ExamTaxes.vue"
import ScoreDetail from "@/components/ScoreDetail.vue"
import AnimationNum from "@/components/AnimationNum.vue"
import Rules from "@/core/Rules.ts"
import { YEAR, d_ExamItems } from "@/data/config.ts"
import DataUtils from "@/data/DataUtils.ts"
import {
  CityType,
  default as IDataEducation,
  DegreeType,
  LevelType,
} from "@/type/IDataEducation.ts"
import IDataEmployment from "@/type/IDataEmployment.ts"
import IDataLive from "@/type/IDataLive.ts"
import IDataOthers from "@/type/IDataOthers.ts"

import { default as IScoreInfo, getEmptyScoreInfo } from "@/type/IScoreInfo.ts"
import moment from "moment"
import {
  computed,
  defineComponent,
  provide,
  reactive,
  ref,
  toRaw,
  watch,
} from "vue"
import { useRoute, useRouter } from "vue-router"
import Points from "@/core/Points"
import { GenderTypes, DistrictType, LiveType } from "@/type/ITypes.ts"

import { $enum } from "ts-enum-util"

export default defineComponent({
  name: "Exam",
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
  components: {
    ExamEmployment,
    ExamLive,
    ExamEducation,
    ExamSuburb,
    ExamInnovate,
    ExamTaxes,
    ExamAge,
    ExamHonor,
    ExamLawAbiding,
    ScoreDetail,
    Charts,
    AnimationNum,
  },
  setup() {
    const points: Points = new Points()
    const router = useRouter()
    const route = useRoute()
    // //console.log(router,route)
    const data = reactive(Object.assign([], d_ExamItems))
    const inputedBirthDay = route.params.birthday
    const inputedGender = route.params.gender
    points.birthday = inputedBirthDay as string
    // let genderStr:string=inputedGender as string
    points.gender = inputedGender as string

    const employmentData: IDataEmployment[] = reactive<Array<IDataEmployment>>(
      []
    )
    const liveData = reactive<Array<IDataLive>>([])

    const educationData: IDataEducation = reactive<IDataEducation>({
      city: CityType.Others,
      level: LevelType.L0,
      degree: DegreeType.None,
      time: points.edu_time,
    })
    const otherData: IDataOthers = reactive<IDataOthers>({
      birthDay: moment(inputedBirthDay).format(DataUtils.DayFormat),
      taxesAwardTimes: 0,
      taxesPunishmentTimes: 0,
      honorScore: 0,
      innovateScore: 0,
      lawPunishMentTimes: 0,
      useSuburb: points.useSuburb,
    })

    const scoreInfo: { detail: IScoreInfo } = {
      detail: getEmptyScoreInfo(),
    }
    provide("employmentData", employmentData)
    provide("liveData", liveData)
    provide("educationData", educationData)
    provide("othersData", otherData)
    provide("scoreInfo", scoreInfo)

    const totalScore = ref<number>(0)
    const isShowForm = ref<boolean>(false)
    const editIndex = ref<number>(-1)
    const editTitle = ref<string>("填写信息")
    const editBy = function (index: number) {
      isShowForm.value = !isShowForm.value
      editIndex.value = index
      editTitle.value = `${d_ExamItems[index].title}信息`
    }
    const currentFormComName = computed(() => {
      let str = ""
      if (editIndex.value === -1) {
        return str
      } else {
        switch (editIndex.value) {
          case 0:
            str = "ExamEmployment"
            break
          case 1:
            str = "ExamLive"
            break
          case 2:
            str = "ExamEducation"
            break
          case 3:
            str = "ExamSuburb"
            break
          case 4:
            str = "ExamInnovate"
            break
          case 5:
            str = "ExamTaxes"
            break
          case 6:
            str = "ExamAge"
            break
          case 7:
            str = "ExamHonor"
            break
          case 8:
            str = "ExamLawAbiding"
            break
        }
        return str
      }
    })

    const updateScore = (index: number, score: number) => {
      data[index].score = score
    }
    // 更新年龄得分
    updateScore(6, Rules.getAgeScore(points))

    let changeIndex: number = -1
    const changeDataHandler = (index: number) => {
      //debugger
      changeIndex = index
      switch (index) {
        case 0:
          points.employment = toRaw(employmentData)
          break
        case 1:
          points.live = toRaw(liveData)
          break
        case 2:
          points.edu_city = educationData.city
          points.edu_level = educationData.level
          points.edu_degree = educationData.degree
          points.edu_time = educationData.time
          break
        case 3:
          points.useSuburb = otherData.useSuburb
          break
        case 4:
          points.innovateScore = otherData.innovateScore
          break
        case 5:
          points.taxesPunishmentTime = otherData.taxesPunishmentTimes
          points.taxesAwidTimes = otherData.taxesAwardTimes
          break
        case 7:
          points.hasHonor = otherData.honorScore > 0
          break
        case 8:
          points.detentionTimes = otherData.lawPunishMentTimes
          break
      }
      let rst: IScoreInfo = Rules.getTotalScore(points)
      //debugger
      updateScore(0, rst.em_score)
      updateScore(1, rst.li_score)
      updateScore(2, rst.edu_score)
      updateScore(3, rst.su_score)
      updateScore(4, rst.inn_score)
      updateScore(5, rst.tex_score)
      updateScore(6, rst.age_score)
      updateScore(7, rst.hon_score)
      updateScore(8, rst.law_score)
      totalScore.value = rst.tot_score
      scoreInfo.detail = rst
      changeIndex = -1
    }
    const afterCloseHandler = function () {
      //console.log("editOk")
      isShowForm.value = false
      // //console.log(otherData.lawPunishMentTimes)
      if (changeIndex != -1) {
        changeDataHandler(changeIndex)
      }
    }
    const isShowSorceDetail = ref<boolean>(false)
    const showScoreDetail = () => {
      isShowSorceDetail.value = true
    }
    const isShowcharts = ref<boolean>(false)
    const showCharts = () => {
      isShowcharts.value = true
    }
    return {
      points,
      otherData,
      data,
      totalScore,
      editTitle,
      editBy,
      isShowForm,
      currentFormComName,
      afterCloseHandler,
      updateScore,
      changeDataHandler,
      isShowSorceDetail,
      showScoreDetail,
      isShowcharts,
      showCharts,
      inputedGender,
      inputedBirthDay,
      YEAR,
    }
  },
})
</script>
<style scoped>
.totalScore {
  font-size: 90px;
  width: 100%;
  text-align: center;
}
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.itemSore {
  font-size: 50px;
  width: 100%;
  text-align: center;
}
.cards {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
.exam-item {
  width: 300px;
  flex: 0 0 auto;
  margin: 10px;
}
</style>
