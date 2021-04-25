<template>
  <a-form>
    <a-form-item label="是否获得省部级以上荣誉">
      <a-switch
        :checked="isChecked"
        checked-children="有"
        un-checked-children="无"
        @change="changeHonorScore"
      />
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, inject, computed } from "vue"
import { default as IDataOthers } from "@/type/IDataOthers.ts"
export default defineComponent({
  name: "ExamHonor",
  setup(props, content) {
    const data = inject<IDataOthers>("othersData")
    const isChecked = computed(() => {
      return data.honorScore > 0 ? true : false
    })
    const changeHonorScore = (checked: boolean) => {
      //console.log(checked)
      if (checked) {
        data.honorScore = 20
      } else {
        data.honorScore = 0
      }
      emitEvent()
    }
    const emitEvent = () => {
      content.emit("change-data", 7)
    }
    return {
      data,
      isChecked,
      changeHonorScore,
    }
  },
})
</script>
<style scoped></style>
