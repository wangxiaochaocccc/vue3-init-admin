<template>
  <div class="user-info-container">
    <el-card>
      <div class="print-box">
        <el-button type="primary" :loading="loadingPrint" v-print="printobj">
          {{ $t('msg.userInfo.print') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <div id="print-container" class="user-info-box">
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <div class="header">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">
              {{ detailData.username }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{ detailData.gender }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">
              {{ detailData.nationality }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">
              {{ detailData.mobile }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">
              {{ detailData.address }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">
              {{ $filters.dateFilter(detailData.openTime) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')">
              <el-tag v-for="(item, index) in detailData.remark" :key="index">
                {{ item }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.address')">
              {{ detailData.address }}
            </el-descriptions-item>
          </el-descriptions>
          <el-image :src="detailData.avatar"></el-image>
        </div>
        <div class="body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>
                    {{ $filters.dateFilter(item.startTime) }}
                    -------
                    {{ $filters.dateFilter(item.endTime) }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="footer">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { userDetail } from '@/api/user-manage'
import { ref } from 'vue'
import { watchSwitchLanguage } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
// 获取数据
const detailData = ref({})
const getData = async () => {
  detailData.value = await userDetail(props.id)
}
getData()
watchSwitchLanguage(getData)
// 打印
const loadingPrint = ref(false)

const printobj = {
  // 打印区域
  id: 'print-container',
  // 打印标题
  popTitle: 'vue-admin',
  // 打印前
  beforeOpenCallback() {
    loadingPrint.value = true
  },
  // 打印时
  openCallback() {
    loadingPrint.value = false
  }
}
</script>

<style lang="scss" scoped>
.user-info-container {
  .el-card {
    margin-bottom: 20px;
    .print-box {
      display: flex;
      justify-content: flex-end;
    }
  }
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .el-descriptions {
    flex-grow: 1;
  }
  .header {
    display: flex;
    justify-content: space-between;
    .el-image {
      width: 187px;
      border: 1px solid #ebeef5;
      padding: 30px 20px;
      border-left: 0;
    }
    .el-tag {
      margin-right: 10px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
