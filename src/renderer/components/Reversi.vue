<template>
  <div class="content">
    <game-info @init="init" />
    <div class="row" v-for="(row,i) in reversi.field" :key=i>
      <div v-for="(cell,j) in row" :key=j>
        <cell :status=cell :grid='[i,j]' :order='reversi.gameInfo.order'/>
      </div>
    </div>
    <cutin />
  </div>
</template>

<script>
  import Cell from './Reversi/Cell'
  import Cutin from './Reversi/Cutin'
  import GameInfo from './Reversi/GameInfo'

  export default {
    name: 'reversi',
    methods: {
      init () {
        this.$store.dispatch("initGame")
      }
    },
    components:{
      Cell,
      Cutin,
      GameInfo
    },
    computed: {
      reversi:function() {
        return this.$store.state.Reversi
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style scoped>

/* *{
  margin: 0;
  padding: 0;
} */

.content{
  position: relative;
}

.row{
  display: flex;
}

</style>
