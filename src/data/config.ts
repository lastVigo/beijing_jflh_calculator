import IExamItem from '@/type/IExamItem'
const YEAR:string='2021'
// const 
const d_ExamItems: Array<IExamItem>=[
    {
        title: '就业', score: 0, isComplate:false
    },
    {
        title: '居住', score: 0, isComplate: false
    },
    {
        title: '教育', score: 0, isComplate: false
    },
    {
        title: '职住', score: 0, isComplate: false
    }
    ,
    {
        title: '双创', score: 0, isComplate: false
    },
    {
        title: '纳税', score: 0, isComplate: false
    },
    {
        title: '年龄', score: 0, isComplate: false
    },
    {
        title: '荣誉', score: 0, isComplate: false
    },
    {
        title: '守法', score: 0, isComplate: false
    }
]
const scort_levels :Map<string,number>=new Map<string,number>()
scort_levels.set('2018',90.75)
scort_levels.set('2019',93.58)
scort_levels.set('2020',97.13)

const DatePickerLocale_zh_CN = {
  lang: {
    placeholder: "选择日期",
    rangePlaceholder: ["开始日期", "结束日期"],
    today: "今天",
    now: "现在",
    backToToday: "回到今天",
    ok: "Ok",
    clear: "清除",
    month: "月",
    year: "年",
    timeSelect: "选择某一个时间",
    dateSelect: "选择某一天",
    monthSelect: "选择某一个月",
    yearSelect: "选择某一年",
    decadeSelect: "选择某一年代",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "前一个月 (PageUp)",
    nextMonth: "后一个月 (PageDown)",
    previousYear: "前一年 (Control + left)",
    nextYear: "后一年 (Control + right)",
    previousDecade: "前一个年代",
    nextDecade: "下一个年代",
    previousCentury: "前一个世纪",
    nextCentury: "后一个世纪",
  },
  timePickerLocale: {
    placeholder: "选择时间",
  },
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
}
export { YEAR, d_ExamItems, scort_levels, DatePickerLocale_zh_CN }