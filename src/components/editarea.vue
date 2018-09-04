<template>
  <div class="editarea" contenteditable="true" @blur="enter" >{{value}}</div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    enter (e) {
      this.$emit('edit', e.target.innerText)
    }
  }
}
</script>

<style>
  .editarea{
    border: 1px dashed transparent;
    padding-left: 2px;
    padding-right: 3px;
  }

  .editarea:hover,
  .editarea:focus{
    border: 1px #00c091 dashed;
    background-color: #E7F2FF;
  }
</style>
