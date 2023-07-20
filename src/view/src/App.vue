<script setup lang="ts">
import { ref } from "vue";
import { vscode, replaceVSCodeUri } from "./utils";
import helloLogo from "./assets/hello-logo.png";

const fetchData = async () => {
  // const res = fetch('https://github.com/caoxiemeihao/vscode-vite-vue/blob/main/package.json?raw=true').then(r => r.text())
  vscode.postMessage({
    command: "@fetch/plugins",
    payload: {
      // url: 'https://github.com/caoxiemeihao/vscode-vite-vue/blob/main/package.json?raw=true',
      url: "https://raw.githubusercontent.com/caoxiemeihao/vscode-vite-vue/main/package.json",
    },
  });
};

const plugins = ref([
  {
    title: "开发环境助手",
    description: "一键安装 Node.js, npm, git",
    author: "草鞋没号",
    icon: replaceVSCodeUri(helloLogo),
  },
  {
    title: "FAT、UAT 开发权限",
    description: "一键申请",
    author: "草鞋没号",
    icon: replaceVSCodeUri(helloLogo),
  },
  {
    title: "npm 物料市场",
    description: "内网/外网包市场",
    author: "草鞋没号",
    icon:  replaceVSCodeUri(helloLogo),
  },
  {
    title: "One click integrated ⚡️ Vite",
    description:
      "Real simple to integrated Vue for @vue/cli created vue2 project. | Real simple to integrated Vue for @vue/cli created vue2 project.",
    author: "草鞋没号",
    icon: "https://vitejs.dev/logo.svg",
  },
]);
</script>

<template>
  <div class="app">
    <div class="plugin-panel">
      <div v-for="(plugin, idx) of plugins" :key="idx" class="plugin-item">
        <div class="plugin-inner-box">
          <div class="top-half">
            <div class="icon">
              <img :src="plugin.icon" />
            </div>
            <div class="title">
              <h2>{{ plugin.title }}</h2>
            </div>
          </div>
          <div class="description">{{ plugin.description }}</div>
          <div class="author">Author: {{ plugin.author }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.plugin-panel {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;

  .plugin-item {
    width: 33.33%;
    padding: 10px;
  }

  .plugin-inner-box {
    padding: 10px;
    box-shadow: 0 0 10px -4px #a1a1a1;
    border-radius: 2px;
  }

  .top-half {
    display: flex;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 7px;
      width: 44px;
      height: 44px;
      overflow: hidden;
      border-radius: 100%;
      box-shadow: 0 0 10px -4px #a1a1a1;
    }

    .title {
      flex-grow: 1;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }

  .description {
    margin-top: 10px;
  }

  .author {
    margin-top: 10px;
  }
}
</style>
