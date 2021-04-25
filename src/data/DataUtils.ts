import { enumKeys, hasKey } from '@/utils.ts'
import  IDataEmployment from "@/type/IDataEmployment.ts"
import IDataLive  from "@/type/IDataLive.ts"
import IDataEducation  from "@/type/IDataEducation.ts"

import { $enum } from "ts-enum-util" 
import IDataOthers from '../type/IDataOthers.ts'
import {
  LiveType,
  CityType,
  DegreeType,
  LevelType,
  DistrictType,
} from "@/type/ITypes"

export default class DataUtils {
  static YearFormat = "YYYY"
  static MonthFormat = "YYYY-MM"
  static DayFormat = "YYYY-MM-DD"
  
  static changeEmploymentData(
    data: IDataEmployment[],
    index: number,
    prop: string,
    value: string
  ) {
    if (data && data.length > index) {
      // data[index][prop]=value
      // 
      let item: IDataEmployment = data[index] as IDataEmployment
      if (item && hasKey(item, prop)) {
        if (prop === "itype") {
          switch (value) {
            case DistrictType.In:
              item[prop] = DistrictType.In
              break
            case DistrictType.Out:
              item[prop] = DistrictType.Out
              break
          }
        } else if (prop === "startMonth") {
          item[prop] = value
        } else if (prop === "endMonth") {
          item[prop] = value
        }

        //console.log(item)
      }
    }
  }
  static changeLiveData(
    data: IDataLive[],
    index: number,
    prop: string,
    value: string
  ) {
    if (data && data.length > index) {
      // data[index][prop]=value
      let item: IDataLive = data[index] as IDataLive
      if (item && hasKey(item, prop)) {
        if (prop === "itype") {
          switch (value) {
            case LiveType.Ownership:
              item[prop] = LiveType.Ownership
              break
            case LiveType.Rental:
              item[prop] = LiveType.Rental
              break
          }
        } else if (prop === "ltype") {
          switch (value) {
            case DistrictType.In:
              item[prop] = DistrictType.In
              break
            case DistrictType.Out:
              item[prop] = DistrictType.Out
              break
          }
        } else if (prop === "startMonth") {
          item[prop] = value
        } else if (prop === "endMonth") {
          item[prop] = value
        }

        //console.log(item)
      }
    }
  }


  static changeEducationData(
    data: IDataEducation,
    prop: string,
    value: string
  ) {
    if (data && hasKey(data, prop)) {
      if (prop === "time") {
        data[prop] = value
      } else if (prop === "city") {
        switch (value) {
          case CityType.Beijing:
            data[prop] = CityType.Beijing
            break
          case CityType.Others:
            data[prop] = CityType.Others
            break
        }
      } else if (prop === "degree") {
        //
        switch (value) {
          case DegreeType.None:
            data[prop] = DegreeType.None
            break
          case DegreeType.Bachelor:
            data[prop] = DegreeType.Bachelor
            break
          case DegreeType.Master:
            data[prop] = DegreeType.Master
            break
          case DegreeType.Doctor:
            data[prop] = DegreeType.Doctor
            break
        }
      } else if (prop === "level") {
        switch (value) {
          case LevelType.L0:
            data[prop] = LevelType.L0
            break
          case LevelType.L1:
            data[prop] = LevelType.L1
            break
          case LevelType.L2:
            data[prop] = LevelType.L2
            break
          case LevelType.L3:
            data[prop] = LevelType.L3
            break
          case LevelType.L4:
            data[prop] = LevelType.L4
            break
        }
      }
      //console.log(data)
    }
  }
  static changeOthersData(data: IDataOthers, prop: string, value: string) {
    //
    if (data && hasKey(data, prop)) {
      //
      if (prop === "birthDay") {
        data[prop] = value
      }
      // //console.log(data)
    }
  }

  static getOptionsFromEnum(
    types: any
  ): Array<{ label: string; value: string }> {
    let rst: Array<{ label: string; value: string }> = [];
    $enum(types)
     
      .forEach((val,key) => {
        // debugger
        let optionItem = {
          label: val.toString(),
          value: val.toString(),
        }
        rst.push(optionItem)
      })
    return rst
  }
  /**
   * 计算从fromSet中剔除set，剩下的set
   * @param fromSet 原始Set
   * @param set 从原始Set中要剔除的内容Set
   */
  static getDiffSet<T>(fromSet: Set<T>, set: Set<T>): Set<T> {
    if (set.size > 0) {
      return new Set<T>([...fromSet].filter((x) => !set.has(x)))
    } else {
      return fromSet
    }
  }
  /**
   * 得到两个set的交集部分
   * @param aSet
   * @param anotherSet
   * @returns
   */
  static getIntersectSet<T>(aSet: Set<T>, anotherSet: Set<T>) {
    // 交集
    let intersect = new Set<T>([...aSet].filter((x) => anotherSet.has(x)))
    return intersect
  }
  // static getStringEnum(type: enum<string>, val: string): enum<string> {}
}