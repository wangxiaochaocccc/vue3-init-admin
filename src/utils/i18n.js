import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'

export const genarateTitle = title => {
  return i18n.global.t('msg.route.' + title)
}

// 监听语言变化
export const watchSwitchLanguage = (...cbs) => {
  watch(() => store.getters.language, () => {
    cbs.forEach(cb => cb(store.getters.language))
  })
}
