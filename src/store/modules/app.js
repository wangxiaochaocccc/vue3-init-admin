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
    },
    changeTagsView (state, { index, tag }) {
      state.tagsView[index] = tag
      setItem(TAGS_VIEW, state.tagsView)
    },
    removeTagsView (state, payload) {
      if (payload.type === 'index') {
        state.tagsView.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsView.splice(payload.index + 1, state.tagsView.length - payload.index + 1)
        state.tagsView.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsView.splice(payload.index + 1, state.tagsView.length - payload.index + 1)
      }
      setItem(TAGS_VIEW, state.tagsView)
    }
  }
}
