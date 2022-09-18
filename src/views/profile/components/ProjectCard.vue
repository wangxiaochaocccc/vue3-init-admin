<template>
    <div class=''>
        <pan-thumb image="/logo.jpeg" :height="'100px'" :width="'100px'">
            <p><a>Hello</a></p>
            {{ $store.getters.userInfo.title }}
        </pan-thumb>
    </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
</script>
<style lang='scss'>

</style>
