// 导入所有svg图标
// 完成 SvgICon的全局注册

import SvgIcon from '@/components/SvgIcon'

// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 通过 require.context() 函数来创建自己的 context
const SvgRquire = require.context('./svg', false, /\.svg$/)

// 此时返回了一个的函数，可以接受一个request的参数，用于require的导入
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有图svg标
// 遍历图标，把图标作为request 传入到require中 完成本地svg图标的导入
SvgRquire.keys().forEach(svg => SvgRquire(svg))

export default app => {
  app.component('svg-icon', SvgIcon)
}
