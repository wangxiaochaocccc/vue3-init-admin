import sortable from 'sortablejs'
import { ref } from 'vue'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export const tableRef = ref(null)

export const initSoreable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelectorAll('.el-table__body-wrapper table tbody')[0]
  sortable.create(el, {
    // 类名
    ghostClass: 'sortable-container',
    // 回调
    async onEnd (event) {
      const { newIndex, oldIndex } = event
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      // 解决重新排序后无法刷新table问题
      tableData.value = []

      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))

      cb?.()
    }
  })
}
