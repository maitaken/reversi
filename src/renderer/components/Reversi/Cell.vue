<template>
  <div class="cell">
    <div class="black-cell" v-if='status.state == "black"'>
    </div>
    <div class="white-cell" v-else-if='status.state == "white"'>
    </div>
    <div 
      v-else-if='status.ableFlip && order'
      class = 'white-cell able-flip'
      @click="putStone"
      ></div>
    <div 
      v-else-if='status.ableFlip && !order'
      class = 'black-cell able-flip'
      @click='putStone'
      ></div>
  </div>
</template>

<script>
export default {
  props:["status","grid","order"],
  methods:{
    putStone() {
      this.$store.dispatch('putStone',this.grid)
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

  .able-flip{
    animation: flashing 1s ease 0s infinite alternate none;
  }

  .able-flip:hover{
    background-color: rgb(15, 137, 15);
  }

  @keyframes flashing{
    0%{
      opacity: 0.1;
    }
    100%{
      opacity: 0.3;
    }
  }
</style>