export default interface IScoreInfo {
  em_in_mounts: number
  em_ou_mounts: number
  ////////////////////////
  em_in_mounts_without_edu: number
  em_ou_mounts_without_edu: number
  em_score: number

  li_ow_in_mounts: number
  li_ow_ou_mounts: number
  li_re_rep_mounths: number
  ////////////////////////
  li_ow_in_mounts_without_edu: number
  li_ow_ou_mounts_without_edu: number
  li_ow_score: number

  li_re_def_mounts: number
  li_re_edu_mounts: number
  li_re_score: number

  li_score: number

  //职住：没有填报信息
  ////////////////////////
  su_both_mounts: number
  su_live_mounts: number
  su_both_score: number
  su_live_score: number
  su_score: number

  edu_years: number
  ////////////////////////
  edu_score: number
  age_score: number
  hon_score: number
  law_score: number
  tex_score: number
  inn_score: number

  tot_score: number
}
export const getEmptyScoreInfo = () => {
  let  rst :IScoreInfo={
    em_in_mounts: 0,
    em_ou_mounts: 0,
    ////////////////////////
    em_in_mounts_without_edu: 0,
    em_ou_mounts_without_edu: 0,
    em_score: 0,

    li_ow_in_mounts: 0,
    li_ow_ou_mounts: 0,
    li_re_rep_mounths: 0,
    ////////////////////////
    li_ow_in_mounts_without_edu: 0,
    li_ow_ou_mounts_without_edu: 0,
    li_ow_score:0,

    li_re_def_mounts: 0,
    li_re_edu_mounts: 0,
    li_re_score:0,

    li_score: 0,

    //职住：没有填报信息
    ////////////////////////
    su_both_mounts: 0,
    su_live_mounts: 0,
    su_both_score: 0,
    su_live_score:0,
    su_score: 0,

    edu_years:0,
    ////////////////////////
    edu_score: 0,
    age_score: 0,
    hon_score: 0,
    law_score: 0,
    tex_score: 0,
    inn_score: 0,

    tot_score:0
  }
  return rst
}