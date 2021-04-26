<template>
  <a-table
    bordered
    :pagination="false"
    :defaultExpandedRowKeys="[-1]"
    :columns="columns"
    :data-source="data"
    
  >
  </a-table>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue"
import IScoreInfo from "../type/IScoreInfo"
import Rules from "@/core/Rules.ts"
export default defineComponent({
  name: "ScoreDetail",
  setup(props, content) {
    const columns = [
      {
        title: "积分项目",
        dataIndex: "kind",
        key: "kind",
        width: "30%",
      },
      {
        title: "记分量",
        dataIndex: "num",
        key: "num",
        align: "right",
        width: "10%",
      },
      {
        title: "积分",
        dataIndex: "score",
        key: "score",
        width: "10%",
        align: "right",
      },
      {
        title: "备注",
        dataIndex: "remark",
        width: "20%",
        key: "remark",
      },
    ]

    interface DataItem {
      key: number
      kind: string
      num: string | number
      score: number | string
      remark: string
      children?: DataItem[]
    }
    const realData: { detail: IScoreInfo } = inject<{ detail: IScoreInfo }>(
      "scoreInfo"
    )

    const detail = realData.detail
    const data: DataItem[] = [
      {
        key: -1,
        kind: "积分",
        num: "",
        score: detail.tot_score,
        remark: "",
        children: [
          {
            key: 0,
            kind: "就业",
            num:
              detail.em_in_mounts_without_edu + detail.em_ou_mounts_without_edu,
            score: detail.em_score,
            remark: "",
            children: [
              {
                key: 100,
                kind: "社保缴纳月数",
                num: detail.em_in_mounts + detail.em_ou_mounts,
                score: "-",
                remark: "选取各类社会保险中累计月份最长的（不含补缴）",
              },
              {
                key: 101,
                kind: "扣除月数",
                num: `-${
                  detail.em_in_mounts +
                  detail.em_ou_mounts -
                  detail.em_in_mounts_without_edu -
                  detail.em_ou_mounts_without_edu
                }`,
                score: "-",
                remark: `在京取得学位/学历期间【${detail.edu_years}】年缴纳的社保`,
              },
            ],
          },
          {
            key: 1,
            kind: "居住",
            score: detail.li_score,
            num: `${
              detail.li_ow_in_mounts_without_edu +
              detail.li_ow_ou_mounts_without_edu
            }/${
              detail.li_re_def_mounts +
              detail.li_re_edu_mounts +
              detail.li_re_rep_mounths
            }`,
            remark: "",
            children: [
              {
                key: 11,
                num:
                  detail.li_ow_in_mounts_without_edu +
                  detail.li_ow_ou_mounts_without_edu,
                kind: "自有住房居住月数",
                score: `-`,
                remark: ``,
                children: [
                  {
                    key: 111,
                    num: detail.li_ow_in_mounts + detail.li_ow_ou_mounts,
                    kind: "申报月数",
                    score: `-`,
                    remark: ``,
                  },
                  {
                    key: 112,
                    num: `-${detail.li_re_edu_mounts}`,
                    kind: "扣除月数",
                    score: "-",
                    remark: `在京取得学位/学历整数前【${detail.edu_years}】年内的自有住房居住月数`,
                  },
                ],
              },
              {
                key: 12,
                num:
                  detail.li_re_def_mounts +
                  detail.li_re_edu_mounts +
                  detail.li_re_rep_mounths,
                kind: "租房居住月数",
                score: `-`,
                remark: ``,
                children: [
                  {
                    key: 121,
                    num: detail.li_re_rep_mounths,
                    kind: "申报月数",
                    score: "-",
                    remark: "",
                  },
                  {
                    key: 122,
                    num: detail.li_re_def_mounts,
                    kind: "据社保推算月数",
                    score: "-",
                    remark: "",
                  },
                  {
                    key: 123,
                    num: detail.li_re_edu_mounts,
                    kind: "按租房对待月数",
                    score: "-",
                    remark: `在京取得学位/学历整数前【${detail.edu_years}】年内的自有住房居住月数`,
                  },
                ],
              },
            ],
          },
          {
            key: 2,
            kind: "教育",
            num: "",
            score: detail.edu_score,
            remark: "",
          },
          {
            key: 3,
            kind: "职住",
            num: `${detail.su_both_mounts}/${detail.su_live_mounts}`,
            score: detail.su_score,
            remark: `此项累计不超过${Rules.Suburb_Award_Max}分`,
            children: [
              {
                key: 31,
                num: detail.su_both_mounts,
                kind: "职住都在城区六之外累计月数",
                score: detail.su_both_score,
                remark: `每满1年积${Rules.Suburb_Award_Both}分，不满一年不计分`,
              },
              {
                key: 32,
                num: detail.su_live_mounts,
                kind: "住在城区六之外累计月数",
                score: detail.su_live_score,
                remark: `每满1年积${Rules.Suburb_Award_Live}分，不满一年不计分`,
              },
            ],
          },
          {
            key: 4,
            kind: "双创",
            num: "",
            score: detail.inn_score,
            remark: "",
          },
          {
            key: 5,
            kind: "纳税",
            num: "",
            score: detail.tex_score,
            remark: "",
          },
          {
            key: 6,
            kind: "年龄",
            num: "",
            score: detail.age_score,
            remark: "",
          },
          {
            key: 7,
            kind: "荣誉",
            num: "",
            score: detail.hon_score,
            remark: "",
          },
          {
            key: 8,
            kind: "守法",
            num: "",
            score: detail.law_score,
            remark: "",
          },
        ],
      },
    ]
    return {
      columns,
      data,
      realData,
    }
  },
})
</script>
<style scoped></style>
