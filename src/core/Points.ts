

import moment from "moment"
import { CityType, DegreeType, LevelType } from "../type/IDataEducation"
import IDataEmployment from "../type/IDataEmployment"
import IDataLive from "../type/IDataLive"
import IScoreInfo, { getEmptyScoreInfo } from "../type/IScoreInfo"
import { GenderTypes } from "../type/ITypes"
import Rules from "./Rules"


export default class Points {
  birthday: string
  // gender: GenderTypes = GenderTypes.Male
  gender: string
  useSuburb: boolean = true // 是否以职住区域积分并且落户

  employment: Array<IDataEmployment> = []
  live: Array<IDataLive> = []

  edu_city: CityType = CityType.Others
  edu_level: LevelType = LevelType.L0
  edu_degree: DegreeType = DegreeType.None
  edu_time: string=moment(Date.now()).format("YYYY-MM-DD")

  innovateScore: number = 0

  taxesAwidTimes: number = 0
  taxesPunishmentTime: number = 0

  hasHonor: boolean = false

  detentionTimes: number = 0

  childrenBirthday?: string

  //////////////计算中间结果-开始
  //   edu_repetivtiveYear: number = 0
  live_ownership_in_set: Set<number> = new Set<number>()
  live_ownership_out_set: Set<number> = new Set<number>()
  live_rental_set: Set<number> = new Set<number>()
  employment_in_set: Set<number> = new Set<number>()
  employment_out_set: Set<number> = new Set<number>()
  suburb_both_set: Set<number> = new Set<number>()
  suburb_live_set: Set<number> = new Set<number>()
  employment_in_without_edu_set: Set<number> = new Set<number>()
  employment_out_without_edu_set: Set<number> = new Set<number>()
  live_owership_in_without_edu_set: Set<number> = new Set<number>()
  live_owership_out_without_edu_set: Set<number> = new Set<number>()
  live_rental_edu_set: Set<number> = new Set<number>()
  live_rental_defalut_set: Set<number> = new Set<number>()

  /////////////// 计算中间结果-结束
  // 结算结果
  result: IScoreInfo = getEmptyScoreInfo()

  getTotalScore(): IScoreInfo {
    return Rules.getTotalScore(this)
  }
}