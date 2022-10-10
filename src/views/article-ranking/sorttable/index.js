import sortable from 'sortablejs'
import { ref } from 'vue'

export const tableRef = ref(null)

export const initSoreable = () => {
  const el = tableRef.value.$el.querySelectorAll('.el-table__body-wrapper table tbody')[0]
  console.log(el)
  sortable.create(el, {
    // 类名
    ghostClass: 'sortable-container',
    // 回调
    onEnd () { }
  })
}
