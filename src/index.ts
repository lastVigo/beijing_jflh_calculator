import {
    createApp
} from 'vue'
import App from '@/App.vue'
import router from '@/router.ts'


import "ant-design-vue/dist/antd.dark.css"
import {
  DatePicker,
  Card,
  Button,
  Divider,
  Modal,
  Drawer,
  Form,
  Checkbox,
  Switch,
  Radio,
  Table,
  InputNumber,
} from "ant-design-vue"

import moment from "moment"
import "moment/locale/zh-cn"
moment.locale('zh-cn')
const app = createApp(App)
app.use(router)
// 按需引入antd模块
app.use(Button)
app.use(DatePicker)
app.use(Card)
app.use(Divider)
app.use(Modal)
app.use(Table)
app.use(Drawer)
app.use(Form)
app.use(Radio)
app.use(Switch)
app.use(Checkbox)
app.use(InputNumber)

app.mount('#app')
