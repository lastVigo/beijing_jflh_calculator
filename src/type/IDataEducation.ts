import { CityType, LevelType, DegreeType } from "./ITypes"
export { CityType, LevelType, DegreeType }
export default interface IDataEducation{
    city: CityType,
    level: LevelType,
    degree:DegreeType
    time:string
}