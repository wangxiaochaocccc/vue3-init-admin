import { DynamicData } from './DynamicData'
import { ref, watch } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'

// 动态列表数据
export const dynamicData = ref(DynamicData())
// 国际化处理
watchSwitchLanguage(() => {
  dynamicData.value = DynamicData()
  initSelected()
})
// 选中的数据
export const selectedData = ref([])

// 初始化选中
const initSelected = () => {
  selectedData.value = dynamicData.value.map(item => item.label)
}
initSelected()

// 渲染的列数据
export const renderData = ref([])
watch(selectedData, (val) => {
  renderData.value = []
  const res = dynamicData.value.filter(item => {
    return val.includes(item.label)
  })
  renderData.value.push(...res)
}, {
  immediate: true
})
