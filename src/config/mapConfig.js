// 地图配置
// 维护：陈冬雪
const GlobalMapConfig = {
  center: [117.246, 32.237], // 默认中心位置
  zoom: 8.8, // 默认地图缩放等级
  baseMap: { // 地图底图
    cite: 'gaosu_map',
    name: 'gaosu_map',
    extent: [108.36330700000008, 24.488952000000086, 122.6998977661133, 38.21349716186528]
  },
  textMap: { // 文字图层
    cite: 'gaosu_map_label',
    name: 'gaosu_map_label',
    extent: [114.881357, 29.422414, 119.636249, 34.648418]
  },
  roadMap: { // 双线路网 高速公路双线图层 最小比例1:25000，最大比例1:1
    // cite: 'gaosu_highway_level6_8',
    cite: 'gaosu_highway',
    name: 'gaosu_highway',
    extent: [115.19698100000005, 29.42368300000004, 119.55718800000011, 34.59951600000005]
  },
  areaMap: { // 行政区划区域
    cite: 'gaosu_city_polygon',
    name: 'district'
  },
  roadMap_level6_8: { // 双线路网 高速公路双线图层，最小比例1:6000000，最大比例1:800000
    cite: 'gaosu_highway_level6_8',
    name: 'gaosu_highway_level6_8',
    extent: [115.19698100000005, 29.42368300000004, 119.55718800000011, 34.59951600000005]
  },
  roadMap_level9_11: { // 双线路网 高速公路双线图层，最小比例1:800000，最大比例1:100000
    cite: 'gaosu_highway_level9_11',
    name: 'gaosu_highway_level9_11',
    extent: [115.19698100000005, 29.42368300000004, 119.55718800000011, 34.59951600000005]
  },
  roadMap_level12_13: { // 双线路网 高速公路双线图层，最小比例1:100000，最大比例1:25000
    cite: 'gaosu_highway_level12_13',
    name: 'gaosu_highway_level12_13',
    extent: [115.19698100000005, 29.42368300000004, 119.55718800000011, 34.59951600000005]
  }
}

export default GlobalMapConfig
