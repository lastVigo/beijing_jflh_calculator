<template>
  <div>{{ showNum }}</div>
</template>
<script lang="ts">
import { computed, defineComponent, watch, ref } from "vue"
import gsap from "gsap"
export default defineComponent({
  name: "AnimationNum",
  props: {
    num: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const workNum = ref<number>(props.num)
    const showNum = computed(() => workNum.value.toFixed(2))
    watch(
      () => props.num,
      (nVal, oVal) => {
        gsap.to(workNum, { duration: 1, delay: 1.5, value: nVal })
      }
    )
    return {
      workNum,
      showNum,
    }
  },
})
</script>
<style scoped></style>
