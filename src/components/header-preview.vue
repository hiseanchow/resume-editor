<template>
  <div class="header preview-header">
    <router-link to="/" class="btn back-btn" tag="div">返回编辑</router-link>
    <div @click="$parent.clickPrint" class="btn print-btn">打印</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .preview-header{
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    padding: 0;
    line-height: 60px;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    background-color: #fff;
    border-bottom: 1px solid #eee;
    z-index: 20;
    .back-btn,
    .print-btn{
      height: 100%;
      padding: 0 50px;
      background-color: #00c091;
      color: #fff;
      user-select: none;
      cursor: pointer;
    }
  }
</style>
