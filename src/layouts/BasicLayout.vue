<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/LUBAIYU" target="_blank">
          GitHub地址 by 路白榆
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout .header {
  display: flex;
  background-color: #ffffff;
  width: 100%;
  position: fixed;
  z-index: 1;
}

#basicLayout .content {
  background: #efefef;
  padding-top: 60px;
}

#basicLayout .footer {
  background: #ffffff;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
