import { DistrictType, LiveType } from "@/type/ITypes.ts";
export default interface IDataLive {
  key: number;
  startMonth: string;
  endMonth: string;
  itype: LiveType;
  ltype?: DistrictType;
}