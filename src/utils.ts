function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[]
}
function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}
export {
    enumKeys,
    hasKey
}