<template>
  <a-form>
    <a-form-item label="采用职住积分">
      <a-switch
        :checked="data.useSuburb"
        checked-children="采用"
        un-checked-children="不采用"
        @change="changeUseSuburb"
      />
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import Rules from "@/core/Rules.ts"
import { default as IDataOthers } from "@/type/IDataOthers.ts"
import moment from "moment"
import { defineComponent, inject } from "vue"
export default defineComponent({
  name: "ExamSuburb",
  setup(props, content) {
    const data = inject<IDataOthers>("othersData")
    const changeUseSuburb = function () {
      emitEvent()
    }
    const emitEvent = () => {
      content.emit("change-data", 3)
    }
    return {
      data,
      changeUseSuburb,
    }
  },
})
</script>
<style scoped></style>
