import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sideBarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsView: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSideBarOpened (state) {
      state.sideBarOpened = !state.sideBarOpened
    },
    setLanguage (state, lang) {
      state.language = lang
      setItem(LANG, lang)
    },
    addTagsView (state, tag) {
      const isFind = state.tagsView.find(item => item.path === tag.path)
      if (!isFind) {
        state.tagsView.push(tag)
        setItem(TAGS_VIEW, state.tagsView)
      }
    }
  }
}
