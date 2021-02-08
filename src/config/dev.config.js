import GlobalMapConfig from './mapConfig'
const globalConfig = {
  // 现场生产环境地址
  title: '安徽高速大脑',
  carNumber: '皖',
  weatherPlace: '安徽',
  // 生产环境地址
  apiIp: 'http://192.168.201.236:8380', // 接口IP
  mapIp: '53.1.252.58:18082', // 地图服务ip
  // 地图相关配置
  mapConf: GlobalMapConfig
}
export default globalConfig
