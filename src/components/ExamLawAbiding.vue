<template>
  <a-form-item label="近5年因违法被拘留">
    <a-input-number
      :min="0"
      v-model:value="data.lawPunishMentTimes"
      @change="emitEvent"
    ></a-input-number
    >次
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue"
import { default as IDataOthers } from "@/type/IDataOthers.ts"
export default defineComponent({
  name: "ExamLawAbiding",
  setup(props, content) {
    const data = inject<IDataOthers>("othersData")
    const emitEvent = () => {
      content.emit("change-data", 8)
    }
    return {
      data,
      emitEvent,
    }
  },
})
</script>
<style scoped></style>
