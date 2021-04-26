<template>
<!-- <a-config-provider locale="zhCN"> -->
  <router-view></router-view>
<!-- </a-config-provider> -->
</template>
<script lang="ts">
import { defineComponent,provide} from 'vue'
import locale  from 'ant-design-vue/es/date-picker/locale/zh_CN';
export default defineComponent({
    name:'App',
    setup(){
        provide("DatePickerLocale_zh_CN",locale)

    }
})
</script>
<style >
#app{
    width: 100%;
    height: 100vh;
    /* background-color: pink; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 40px;
}
.content{
    width:960px;
}
 h1,h3{
        width:100%;
        text-align: center;
    }
</style>