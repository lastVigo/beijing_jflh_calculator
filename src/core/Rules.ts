import { GenderTypes ,CityType,DegreeType,LevelType,DistrictType ,LiveType} from "../type/ITypes";
import IDataLive from "@/type/IDataLive.ts";
import {YEAR} from '@/data/config.ts'

import moment from 'moment'
import Points from "./Points";
import DataUtils from "../data/DataUtils";


import IScoreInfo from "../type/IScoreInfo";
export default class Rules {
  // 退休年龄
  static readonly Male_Age: number = 60;
  static readonly Female_Age: number = 50;
  static readonly Female_Adv_Age: number = 55;
  // 子女随同落户最大年龄
  static readonly Children_Max_age: number = 18;
  // 子女在达到随同落户最大年龄后的一年，仍可随同
  static readonly Children_Max_age_Use: number = Rules.Children_Max_age + 1;
  //社保记录最早日期
  static readonly Insurance_Start_Date: moment.Moment = moment("1998-07-01");
  static readonly Last_Year_End_Date: moment.Moment = moment(YEAR + "-12-31")
    .subtract(1, "year")
    .endOf("day");
  // 租房登记最早日期
  static readonly Live_Rental_Start_Date: moment.Moment = moment(
    YEAR + "-08-01"
  ).subtract(1, "year");
  // 职住积分开始日期
  static readonly Suburb_Start_Date: moment.Moment = moment("2018-01-01");
  // 以下是具体积分规则中的常量
  static readonly Age_Award_Score: number = 20;
  static readonly Age_Threshold: number = 45;
  static readonly Taxes_Per_Award: number = 2;
  static readonly Taxes_Award_Max: number = 6;
  static readonly Taxes_Per_PunishMent: number = 12;
  static readonly Honor_Award_Max: number = 20;
  static readonly Innovate_Award_Max: number = 12;
  static readonly Law_Per_Time_PunishMent: number = 30;
  static readonly Edu_Award_Level_0: number = 0;
  static readonly Edu_Award_Level_1: number = 10.5;
  static readonly Edu_Award_Level_2: number = 10.5;
  static readonly Edu_Award_Level_3: number = 15;
  static readonly Edu_Award_Level_4: number = 26;

  static readonly Edu_Award_Degree_N: number = 0;
  static readonly Edu_Award_Degree_B: number = 10.5;
  static readonly Edu_Award_Degree_M: number = 15;
  static readonly Edu_Award_Degree_D: number = 26;

  static readonly Edu_Award_Double_B: number = 15;
  static readonly Edu_Award_Double_M: number = 26;
  static readonly Edu_Award_Double_D: number = 37;

  static readonly Live_Award_ownership: number = 1;
  static readonly Live_Award_Rental: number = 0.5;

  static readonly Suburb_Award_Both: number = 3;
  static readonly Suburb_Award_Live: number = 2;
  static readonly Suburb_Award_Max: number = 12;

  static readonly Employment_Award: number = 3;

  // 取得学位学历期间社保扣除的年份
  static readonly Learnning_Year_L0: number = 3;
  static readonly Learnning_Year_L1: number = 4;
  static readonly Learnning_Year_L2: number = 3;

  static readonly Year_Month_Format: string = "YYYYMM";

  /**
   * 教育程度对应积分Map
   */
  static readonly Edu_Level_Score_Map = new Map()
    .set(LevelType.L0, Rules.Edu_Award_Level_0)
    .set(LevelType.L1, Rules.Edu_Award_Level_1)
    .set(LevelType.L2, Rules.Edu_Award_Level_2)
    .set(LevelType.L3, Rules.Edu_Award_Level_3)
    .set(LevelType.L4, Rules.Edu_Award_Level_4);
    /**
     * 教育学历对应积分Map
     */
  static readonly Edu_Degree_Score_Map = new Map()
    .set(DegreeType.None, Rules.Edu_Award_Degree_N)
    .set(DegreeType.Bachelor, Rules.Edu_Award_Degree_B)
    .set(DegreeType.Master, Rules.Edu_Award_Degree_M)
    .set(DegreeType.Doctor, Rules.Edu_Award_Degree_D);
  //////////////////////
  /**
   * 获取上一年度的最后一天日期字符串
   * @returns string
   */
  static getBaseDayStr(): string {
    return Rules.getBaseDay().format(DataUtils.DayFormat);
  }
  /**
   * 根据配置中的积分年度常量，得到多数分值的统计时间节点（上一年的最后一天）
   * @returns 
   */
  static getBaseDay(): moment.Moment {
    return moment(YEAR).subtract(1, "y").endOf("year");
  }
  //////////////////////////////////////////////////
  /**
   * 计算指定的积分年度、指定的出生日期的人能得到的年龄积分
   * @param bDay 指定的出生日期
   * @param year 指定的积分年度
   * @returns
   */
  static countAgeScore(bDay: string, year: string): number {
    let birthday: moment.Moment = moment(bDay);
    // 积分年度前一年的1月1日
    let baseDay: moment.Moment = moment(year)
      .subtract(1, "years")
      .startOf("year");

    baseDay.subtract(Rules.Age_Threshold, "years");
    let score = 0;
    if (birthday.isAfter(baseDay)) {
      score = 20;
    } else {
      let tempTime = moment.duration(baseDay.diff(birthday));
      let gap = tempTime.asYears();
      if (gap < 1) {
        gap = 1;
      } else {
        gap = Math.floor(gap);
      }
      score = Rules.Age_Award_Score - gap * 4;
      if (score < 0) {
        score = 0;
      }
    }
    return score;
  }
  ///////////////
  /**
   * 得到年龄积分
   * @param points
   * @returns
   */
  static getAgeScore(points: Points): number {
    let birthDay: string = points.birthday;
    let score: number = Rules.countAgeScore(birthDay, YEAR);
    points.result.age_score = score;
    return score;
  }
  static getInnovateScore(points: Points): number {
    let score: number = points.innovateScore;
    score = score > Rules.Innovate_Award_Max ? Rules.Innovate_Award_Max : score;
    points.result.inn_score = score;
    return score;
  }
  /**
   * 得到荣誉积分
   * @param points
   * @returns
   */
  static getHonorScore(points: Points): number {
    let score: number = 0;
    if (points.hasHonor) {
      score = Rules.Honor_Award_Max;
    }
    points.result.hon_score = score;
    return score;
  }
  /**
   *
   * @param points 得到守法积分
   * @returns
   */
  static getLawScore(points: Points): number {
    let times: number = points.detentionTimes;
    let score: number = times * Rules.Law_Per_Time_PunishMent;
    points.result.law_score = score;
    return -score;
  }
  static getTaxesScore(points: Points) {
    //taxesAwidTimes: number, taxesPunishmentTime: number
    let times = points.taxesAwidTimes;
    let score = times * Rules.Taxes_Per_Award;
    if (score > Rules.Taxes_Award_Max) {
      score = Rules.Taxes_Award_Max;
    }
    if (points.taxesPunishmentTime > 0) {
      score = score - Rules.Taxes_Per_PunishMent * points.taxesPunishmentTime;
    }
    points.result.tex_score = score;
    return score;
  }
  /**
   * 计算得到教育积分
   * @param points
   * @returns
   */
  static getEducationScore(points: Points): number {
    let degree = points.edu_degree;
    let level = points.edu_level;
    let levelScore: number = 0;
    let degreeScore: number = 0;
    let score: number = 0;
    levelScore = Rules.Edu_Level_Score_Map.get(level);
    degreeScore = Rules.Edu_Degree_Score_Map.get(degree);

    // 学历学位都没有/学位学历同时获取到而且匹配，采用更高分数
    if (levelScore === degreeScore) {
      switch (degree) {
        case DegreeType.None:
          score = Rules.Edu_Award_Degree_N;
          break;
        case DegreeType.Bachelor:
          score = Rules.Edu_Award_Double_B;
          break;
        case DegreeType.Master:
          score = Rules.Edu_Award_Double_M;
          break;
        case DegreeType.Doctor:
          score = Rules.Edu_Award_Double_D;
          break;
      }
    }
    // 学历学位不匹配，采用二者之中最高的
    else {
      score = degreeScore > levelScore ? degreeScore : levelScore;
    }

    let repetivtiveYear: number = 0;
    // 10.5/15/26和37对应3和4两个社保扣除期
    switch (score) {
      case 0:
        repetivtiveYear = 0;
        break;
      case Rules.Edu_Award_Double_B:
        repetivtiveYear = Rules.Learnning_Year_L2;
        break;
      default:
        repetivtiveYear = Rules.Learnning_Year_L0;
    }

    points.result.edu_score = score;
    points.result.edu_years = repetivtiveYear;
    //debugger
    return score;
  }

  /**
   * 计算总分
   * @param points
   * @returns
   */
  static getTotalScore(points: Points): IScoreInfo {
    Rules.getEducationScore(points);
    Rules.handleEmployment(points);
    Rules.handleLive(points);
    Rules.handleSuburb(points);
    Rules.handleEducationEffect(points);
    Rules.handleLiveDefaulRental(points);
    Rules.countTotalscore(points);
    return points.result;
  }
  static countTotalscore(points: Points): void {
    let scoreInfo: IScoreInfo = points.result;
    scoreInfo.em_in_mounts = points.employment_in_set.size;

    scoreInfo.em_ou_mounts = points.employment_out_set.size;
    scoreInfo.em_in_mounts_without_edu =
      points.employment_in_without_edu_set.size;
    scoreInfo.em_ou_mounts_without_edu =
      points.employment_out_without_edu_set.size;
    scoreInfo.em_score =
      ((scoreInfo.em_in_mounts_without_edu +
        scoreInfo.em_ou_mounts_without_edu) /
        12) *
      Rules.Employment_Award;

    // ////
    scoreInfo.li_ow_in_mounts = points.live_ownership_in_set.size;
    scoreInfo.li_ow_ou_mounts = points.live_ownership_out_set.size;
    scoreInfo.li_re_rep_mounths = points.live_rental_set.size;
    scoreInfo.li_ow_in_mounts_without_edu =
      points.live_owership_in_without_edu_set.size;
    scoreInfo.li_ow_ou_mounts_without_edu =
      points.live_owership_out_without_edu_set.size;
    scoreInfo.li_re_def_mounts = points.live_rental_defalut_set.size;
    scoreInfo.li_re_edu_mounts = points.live_rental_edu_set.size;
    let li_re_mounts: number =
      scoreInfo.li_re_rep_mounths +
      scoreInfo.li_re_def_mounts +
      scoreInfo.li_re_edu_mounts;

    // 2类居住月数转年不取整，依据是公示的一落户名单。
    // 删除：不清楚计算细节，暂时按单项保留3位小数计算，总项目保留2位小数
    // 删除原因：除法做两次影响计算精度
    // let li_re_score: number = Number(
    //   ((li_re_mounts / 12) * Rules.Live_Award_Rental).toFixed(3)
    // );
    // scoreInfo.li_re_score = li_re_score;

    let li_ow_mounts: number =
      scoreInfo.li_ow_in_mounts_without_edu +
      scoreInfo.li_ow_ou_mounts_without_edu;
    // let li_ow_score:number=Number(((li_ow_mounts/12)*Rules.Live_Award_ownership).toFixed(3))
    // scoreInfo.li_ow_score = li_ow_score;
    // scoreInfo.li_score = Number((li_re_score + li_ow_score).toFixed(2));
    let li_score: number =
      (li_ow_mounts * Rules.Live_Award_ownership +
        li_re_mounts * Rules.Live_Award_Rental) /
      12;
    scoreInfo.li_score = Number(li_score.toFixed(2));

    scoreInfo.su_both_mounts = points.suburb_both_set.size;
    scoreInfo.su_live_mounts = points.suburb_live_set.size;

    let suburBothScore =
      Math.floor(scoreInfo.su_both_mounts / 12) * Rules.Suburb_Award_Both;
    let suburLiveScore =
      Math.floor(scoreInfo.su_live_mounts / 12) * Rules.Suburb_Award_Live;
    let suburbScore = suburBothScore + suburLiveScore;
    suburbScore =
      suburbScore > Rules.Suburb_Award_Max
        ? Rules.Suburb_Award_Max
        : suburbScore;

    scoreInfo.su_both_score = suburBothScore;
    scoreInfo.su_live_score = suburLiveScore;
    scoreInfo.su_score = suburbScore;

    scoreInfo.age_score = Rules.getAgeScore(points);
    scoreInfo.hon_score = Rules.getHonorScore(points);
    scoreInfo.law_score = Rules.getLawScore(points);
    scoreInfo.inn_score = Rules.getInnovateScore(points);
    scoreInfo.tex_score = Rules.getTaxesScore(points);

    let tScore: number =
      scoreInfo.tex_score +
      scoreInfo.inn_score +
      scoreInfo.law_score +
      scoreInfo.hon_score +
      scoreInfo.age_score +
      scoreInfo.edu_score +
      scoreInfo.su_score +
      scoreInfo.li_score +
      scoreInfo.em_score;
    scoreInfo.tot_score = Number(tScore.toFixed(2));
  }
  /**
   * 计算社保缴费期内没有申报的租房月数
   * @param points
   */
  private static handleLiveDefaulRental(points: Points): void {
    // 计算无需申报租房的时间段

    // 合并所有社保时间段
    let tempESet = new Set([
      ...points.employment_in_set,
      ...points.employment_out_set,
    ]);

    // 租赁申报截止时间
    let rentalStart: number = Number(
      Rules.Live_Rental_Start_Date.format(Rules.Year_Month_Format)
    );
    // 所有社保时间段剔除掉 租赁申报时间节点的部分
    tempESet = new Set<number>(
      [...tempESet].filter((x) => {
        return x < rentalStart;
      })
    );
    // 所有自有住房月份-其中租赁申报时间节点之后的月份=在租赁申报时间节点之前的所有自住住房的月份
    points.live_ownership_in_set;
    points.live_ownership_out_set;
    let tempLSet = new Set([
      ...points.live_ownership_in_set,
      ...points.live_ownership_out_set,
    ]);

    tempLSet = new Set<number>(
      [...tempLSet].filter((x) => {
        return x < rentalStart;
      })
    );

    // 默认租赁居住 = 社保-自有住房
    points.live_rental_defalut_set = DataUtils.getDiffSet(tempESet, tempLSet);
  }
  /**
   * 处理教育信息
   * @param points
   */
  private static handleEducationEffect(points: Points): void {
    let eduSet: Set<number> = new Set<number>();
    // 教育在北京的才计算教育扣除社保的set
    if (points.edu_city == CityType.Beijing) {
      let eduTime: moment.Moment = moment(points.edu_time);
      let eduYears: number = points.result.edu_years;
      let eduSTime: moment.Moment = moment(eduTime).subtract(eduYears, "years");
      eduSet.add(Number(eduTime.format(Rules.Year_Month_Format)));
      let eduGap: number = eduYears * 12;
      while (eduGap > 0) {
        eduSTime.add(1, "month");
        eduSet.add(Number(eduSTime.format(Rules.Year_Month_Format)));
        eduGap--;
      }
      // 剔除掉社保中因为教育扣除的缴费月份,得到两个新的set
      {
        points.employment_out_without_edu_set = DataUtils.getDiffSet(
          points.employment_out_set,
          eduSet
        );
        points.employment_in_without_edu_set = DataUtils.getDiffSet(
          points.employment_in_set,
          eduSet
        );
        // //debugger
      }
      // 剔除掉居住中因为教育改变积分单项数值的月份,得到3个新的set
      {
        // 以下两句求自有住房扣除教育因素剩下的月数
        points.live_owership_in_without_edu_set = DataUtils.getDiffSet(
          points.live_ownership_in_set,
          eduSet
        );
        points.live_owership_out_without_edu_set = DataUtils.getDiffSet(
          points.live_ownership_out_set,
          eduSet
        );
        // 以下得到因为教育影响，导致自有住房被当作租房处理的月数
        let liveRentalEduSet: Set<number> = new Set<number>();
        liveRentalEduSet = DataUtils.getIntersectSet(
          points.live_ownership_in_set,
          eduSet
        );
        let tempSet = DataUtils.getIntersectSet(
          points.live_ownership_out_set,
          eduSet
        );
        liveRentalEduSet = new Set([...liveRentalEduSet, ...tempSet]);
        points.live_rental_edu_set = liveRentalEduSet;
      }
    } else {
      points.employment_out_without_edu_set = points.employment_out_set;
      points.employment_in_without_edu_set = points.employment_in_set;
      points.live_owership_in_without_edu_set = points.live_ownership_in_set;
      points.live_owership_out_without_edu_set = points.live_ownership_out_set;
    }
  }
  /**
   * 处理职住信息
   * @param points
   */
  private static handleSuburb(points: Points): void {
    //以职住区域积分落户&& 有在城六区外有自有住房&&统计时间节点仍持有]
    //debugger;
    if (
      points.useSuburb &&
      points.live_ownership_out_set.size > 0 &&
      points.live_ownership_out_set.has(
        Number(Rules.Last_Year_End_Date.format(Rules.Year_Month_Format))
      )
    ) {
      // 计算职住在城六区外set
      points.suburb_both_set = DataUtils.getIntersectSet(
        points.live_ownership_out_set,
        points.employment_out_set
      );
      // 计算居住在城六区外set
      points.suburb_live_set = DataUtils.getIntersectSet(
        points.live_ownership_out_set,
        points.employment_in_set
      );
    } else {
      points.suburb_both_set = new Set<number>();
      points.suburb_live_set = new Set<number>();
    }
  }
  /**
   * 计算居住的三个set
   * @param cloneData 居住信息
   * @returns [自有住房在城六区月份，自有住房在非城六区月份，申报租房月份]
   */
  private static handleLive(points: Points): void {
    interface tempI {
      s: string;
      e: string;
      t: LiveType;
      lt: DistrictType;
    }
    let tempArray: tempI[] = [];
    let ownershipMonths: number = 0;
    let rentaMonths: number = 0;
    let baseDay: moment.Moment = Rules.getBaseDay();
    let cloneData = points.live;
    for (let i = 0; i < cloneData.length; i++) {
      let item = cloneData[i];
      let sD: moment.Moment = moment(item.startMonth);
      let eD: moment.Moment = moment(item.endMonth);
      // 如果超出居住积分截止日期，则以截止日期为准
      if (eD.isAfter(baseDay)) {
        eD = moment(baseDay);
      }
      // 开始时间晚于结束时间，不做计算了
      if (sD.isAfter(eD)) {
        continue;
      }
      tempArray.push({
        s: sD.format(Rules.Year_Month_Format),
        e: eD.format(Rules.Year_Month_Format),
        t: item.itype,
        lt: item.ltype,
      });
    }
    let oISet: Set<number> = new Set<number>();
    let oOSet: Set<number> = new Set<number>();
    let rSet: Set<number> = new Set<number>();
    let putInSet = (item: { d: string; t: LiveType; lt: DistrictType }) => {
      switch (item.t) {
        case LiveType.Ownership:
          if (item.lt === DistrictType.In) {
            oISet.add(Number(item.d));
          } else {
            oOSet.add(Number(item.d));
          }
          break;
        case LiveType.Rental:
          rSet.add(Number(item.d));
          break;
      }
    };
    tempArray.forEach((item) => {
      putInSet({ d: item.s, t: item.t, lt: item.lt });
      let gap = moment.duration(moment(item.e).diff(moment(item.s))).asMonths();
      gap = Math.floor(gap);
      let m: moment.Moment = moment(item.s);

      ////;
      while (gap > 0) {
        m.add(1, "month");
        gap--;
        let tt = {
          d: m.format(Rules.Year_Month_Format),
          t: item.t,
          lt: item.lt,
        };
        putInSet(tt);
      }
    });
    // 剔除自有住房月份中和申报租住重叠的
    oISet = DataUtils.getDiffSet(oISet, rSet);
    oOSet = DataUtils.getDiffSet(oOSet, rSet);
    // 三个集合与社保时间取交集
    let eSet: Set<number> = new Set<number>([
      ...points.employment_in_set,
      ...points.employment_out_set,
    ]);
    oISet = DataUtils.getIntersectSet(eSet, oISet);
    oOSet = DataUtils.getIntersectSet(eSet, oOSet);
    rSet = DataUtils.getIntersectSet(eSet, rSet);

    points.live_ownership_in_set = oISet;
    points.live_ownership_out_set = oOSet;
    points.live_rental_set = rSet;
    //debugger
  }
  /**
   * 计算社保按地区缴纳的两个set
   * @param employmentData
   * @returns [在城六区缴纳社保的月份set，在非城六区缴纳的社保月份set]
   */
  private static handleEmployment(points: Points): void {
    interface tempI {
      s: string;
      e: string;
      t: DistrictType;
    }

    let temparray: tempI[] = [];
    let baseDay: moment.Moment = Rules.getBaseDay();
    for (let i = 0; i < points.employment.length; i++) {
      let item = points.employment[i];

      let sD: moment.Moment = moment(item.startMonth);
      let eD: moment.Moment = moment(item.endMonth);
      // 开始时间晚于结束时间，不做计算了
      if (sD.isAfter(eD)) {
        continue;
      }
      if (sD.isBefore(Rules.Insurance_Start_Date)) {
        sD = moment(Rules.Insurance_Start_Date);
      }
      // 如果超出居住积分截止日期，则以截止日期为准
      if (eD.isAfter(baseDay)) {
        eD = moment(baseDay);
      }

      let tempObj: tempI = {
        s: sD.format(Rules.Year_Month_Format),
        e: eD.format(Rules.Year_Month_Format),
        t: item.itype,
      };
      temparray.push(tempObj);
    }
    let setIn = new Set<number>();
    let setOut = new Set<number>();

    let putInSet = (item: { d: string; t: DistrictType }) => {
      switch (item.t) {
        case DistrictType.In:
          setIn.add(Number(item.d));
          break;
        case DistrictType.Out:
          setOut.add(Number(item.d));
          break;
      }
    };
    temparray.forEach((item) => {
      putInSet({ d: item.s, t: item.t });
      let gap = moment.duration(moment(item.s).diff(moment(item.e))).asMonths();
      gap = Math.abs(Math.floor(gap));
      let m: moment.Moment = moment(item.s);

      while (gap > 0) {
        m.add(1, "month");
        gap--;
        let tt = {
          d: m.format(Rules.Year_Month_Format),
          t: item.t,
        };
        putInSet(tt);
      }
    });
    // 如果社保的两个set存在交集，从城六区set中剔除交集部分
    // 非城六区中剔除掉和城六区的部分，为计算后的非城六区set
    // let differenceEmployment = new Set(
    //   [...setOut].filter((x) => !setIn.has(x))
    // );
    setOut = DataUtils.getDiffSet(setOut, setIn);
    points.employment_in_set = setIn;
    points.employment_out_set = setOut;
    // //debugger
  }
  //////////////////
  /**
   * 根据性别得到法定退休年龄
   * @param gender 性别 @see GenderTypes
   * @returns
   */
  static getRetireAgeByGender(gender: GenderTypes | string) {
    let age: number = 0;
    switch (gender) {
      case GenderTypes.Male:
        age = Rules.Male_Age;
        break;
      case GenderTypes.Female1:
        age = Rules.Female_Age;
        break;
      case GenderTypes.Female2:
        age = Rules.Female_Adv_Age;
        break;
    }
    return age;
  }
  /**
   * 判断是否超过法定退休年龄
   * @param birthDay 出生日期
   * @param baseDay 计算基准日期
   * @param gender 人员性别
   * @returns 超龄返回ture；否则返回false
   */
  static isRetire(
    birthDay: moment.Moment,
    baseDay: moment.Moment,
    gender: string
  ): boolean {
    // let age: number = 0;
    // switch (gender) {
    //   case Genders.Male:
    //     age = 60;
    //     break;
    //   case Genders.Female1:
    //     age = 50;
    //     break;
    //   case Genders.Female2:
    //     age = 55;
    //     break;
    // }
    let age: number = Rules.getRetireAgeByGender(gender);
    //
    let minBirthDay = moment(baseDay).subtract(age, "y");
    let newBirthDay = moment(birthDay);
    console.log(newBirthDay.format("YYYY-MM-DD"));
    console.log(minBirthDay.format("YYYY-MM-DD"));
    console.log(newBirthDay.isBefore(minBirthDay));
    console.log("00000000000000000000000000000");
    return newBirthDay.isBefore(minBirthDay);
    // return false
  }
  /**
   * 根据当年的计算分值，推算以后若干年的
   * @param yearNum 总共算几年的
   * @param scoreInfo 当年的计算结果
   * @param birthday 生日
   * @param gender 性别
   * @param childrenBirthday  未成年子女出生日期
   * @param flag 推算条件[1,2,3,4]
   * 对应条件：
   * 1:自有住房-城六区 每年居住+1
   * 2:自有住房-非城六区-职住 每年居住+1 职住+3
   * 3:自有住房-非城六区-住 每年居住+1 职住+2
   * 4:租房 每年居住+0.5
   * @returns
   */
  static getFutureScores(
    yearNum: number,
    scoreInfo: IScoreInfo,
    birthday: string,
    gender: string,
    childrenBirthday: string,
    flag: string
  ): [string[], number[], string] {
    let year: moment.Moment = moment(YEAR);
    let years: string[] = [];
    let scores: number[] = [];
    let lastYear: string = "";
    for (let i = 0; i < yearNum; i++) {
      years.push(year.format("YYYY"));
      year.add(1, "year");
    }

    scores[0] = scoreInfo.tot_score;
    for (let i = 1; i < yearNum; i++) {
      if (birthday) {
        if (
          Rules.isRetire(
            moment(birthday),
            moment(years[i] as string)
              .startOf("year")
              .subtract(1, "years"),
            gender
          )
        ) {
          scores.push(0);
        } else {
          // 算当年的年龄积分
          let ageScore: number = Rules.countAgeScore(
            birthday,
            years[i] as string
          );
          let nDetail = Object.assign({}, scoreInfo);
          if(nDetail.em_score!=0){
            nDetail.age_score = ageScore;
            nDetail.em_score += 3 * i;
            if (flag == "4") {
              nDetail.li_score += Rules.Live_Award_Rental * i;
            } else {
              nDetail.li_score += Rules.Live_Award_ownership * i;
            }
            if (flag == "2") {
              nDetail.su_score += Rules.Suburb_Award_Both * i;
            } else if (flag == "3") {
              nDetail.su_score += Rules.Suburb_Award_Live * i;
            }
            if (nDetail.su_score > Rules.Suburb_Award_Max) {
              nDetail.su_score = Rules.Suburb_Award_Max;
            }
          }
          //debugger;
          let total: number =
            nDetail.tex_score +
            nDetail.inn_score +
            nDetail.law_score +
            nDetail.hon_score +
            nDetail.age_score +
            nDetail.edu_score +
            nDetail.su_score +
            nDetail.li_score +
            nDetail.em_score;
          nDetail.tot_score = Number(total.toFixed(2));
          console.log(years[i], nDetail.tot_score);

          scores.push(nDetail.tot_score);
        }
      }
    }

    if (childrenBirthday !== "") {
      let bDate: moment.Moment = moment(childrenBirthday);
      bDate.add(Rules.Children_Max_age_Use, "years");
      let lYear = bDate.format("YYYY");
      // 在选中的年限范围内，存在子女随同落户最后时间
      if (years.includes(lYear)) {
        lastYear = lYear;
      }
    }

    return [years, scores, lastYear];
  }
}