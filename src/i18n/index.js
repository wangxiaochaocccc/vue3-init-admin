import { createI18n } from 'vue-i18n'
import zhlocale from './lang/zh'
import enlocale from './lang/en'
// 创建数据源
const messages = {
  en: {
    msg: {
      ...enlocale
    }
  },
  zh: {
    msg: {
      ...zhlocale
    }
  }
}

// 创建语言变量
const locale = 'zh'

// 初始化i18n实例

const i18n = createI18n({
  // 使用composition API
  legacy: false,
  // 全局注入$t函数
  globalInjection: true,
  messages,
  locale
})

export default i18n
