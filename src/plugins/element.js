import Vue from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Card,
  DatePicker,
  TimeSelect,
  TimePicker,
  Pagination,
  Button,
  Row,
  Col,
  ButtonGroup,
  Table,
  TableColumn,
  Tooltip,
  Input,
  Select,
  Header,
  Aside,
  Main,
  Tabs,
  TabPane,
  Autocomplete,
  InputNumber,
  Form,
  FormItem,
  MessageBox,
  Message,
  Notification,
  Radio,
  RadioGroup,
  RadioButton,
  option,
  Menu,
  Submenu,
  Switch,
  MenuItem,
  MenuItemGroup,
  Loading,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar
} from 'element-ui'

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Container)
Vue.use(Card)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Input)
Vue.use(Select)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Autocomplete)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(option)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Switch)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Scrollbar)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
