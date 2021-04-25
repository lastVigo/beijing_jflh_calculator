<template>
  <a-form>
    <a-form-item label="纳税突出">
      <a-checkbox :checked="editable" @change="editableChange"
        >最近连续3年在京纳税</a-checkbox
      >
      其中<a-input-number
        :value="data.taxesAwardTimes"
        :min="0"
        :max="3"
        :disabled="!editable"
        @change="changeAwardTimes"
      />年纳税超过10万
    </a-form-item>
    <a-form-item label="涉税违法">
      最近5年内涉税违法<a-input-number
        v-model:value="data.taxesPunishmentTimes"
        :min="0"
        @change="emitEvent"
      />次
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue"
import { default as IDataOthers } from "@/type/IDataOthers.ts"
export default defineComponent({
  name: "ExamTaxes",
  setup(props, content) {
    const data = inject<IDataOthers>("othersData")
    let initEditable = false
    if (data && data.taxesAwardTimes) {
      initEditable = true
    }
    const editable = ref<boolean>(initEditable)
    const editableChange = (event: any) => {
      let val = event.target.checked
      editable.value = val
      if (val == false) {
        changeAwardTimes(0)
      }
    }
    const changeAwardTimes = (num: number) => {
      //console.log(num)
      data.taxesAwardTimes = num
      emitEvent()
    }
    const emitEvent = () => {
      content.emit("change-data", 5)
    }
    return {
      editable,
      data,
      //events
      editableChange,
      changeAwardTimes,
      emitEvent,
    }
  },
})
</script>
<style scoped></style>
