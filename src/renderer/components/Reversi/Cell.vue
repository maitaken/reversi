<template>
  <div class="cell" @click="clickCell">
    <div class="black-cell" v-if='status.state == "black"'>
    </div>
    <div class="white-cell" v-else-if='status.state == "white"'>
    </div>
  </div>
</template>

<script>
export default {
  props:["status"],
  methods:{
    clickCell() {
      this.$store.dispatch('changePlayer')
    }
  }
}
</script>

<style scoped>
  .cell{
    height: 4em;
    width: 4em;
    background-color: rgb(15, 137, 15);
    border:solid black 1px;
  }

  .black-cell{
    background-color: #000;
    height: 100%;
    border-radius: 50%;
  }

  .white-cell{
    background-color: #fff;
    height: 100%;
    border-radius: 50%;
  }
</style>