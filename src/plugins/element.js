import Vue from 'vue'
import {
  Button,
  Row,
  Col,
  Table,
  TableColumn,
  Dialog,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Select,
  Option
} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
