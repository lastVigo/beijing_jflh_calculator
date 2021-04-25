<template>
  <a-form>
    <a-form-item label="双创积分">
      <a-input-number
        max="12"
        min="0"
        v-model:value="data.innovateScore"
        @change="emitEvent"
      ></a-input-number>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue"
import { default as IDataOthers } from "@/type/IDataOthers.ts"
export default defineComponent({
  name: "ExamInnovate",
  setup(props, content) {
    const data = inject<IDataOthers>("othersData")
    const emitEvent = () => {
      content.emit("change-data", 4)
    }
    return {
      data,
      emitEvent,
    }
  },
})
</script>
<style scoped></style>
