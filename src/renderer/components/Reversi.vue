<template>
  <div class="content">
    <div>
      現在のプレイヤー : {{1 + reversi.order}}
    </div>
    <div class="row" v-for="(row,i) in reversi.field" :key=i>
      <div v-for="(cell,j) in row" :key=j>
        <cell :status=cell :grid='[i,j]' :order='reversi.order'/>
      </div>
    </div>
    <cuntin />
  </div>
</template>

<script>
  import Cell from './Reversi/Cell'
  import Cuntin from './Reversi/Cutin'

  export default {
    name: 'reversi',
    methods: {
      init () {
        this.$store.dispatch("initGame")
      }
    },
    components:{
      Cell,
      Cuntin
    },
    computed: {
      reversi:function() {
        return this.$store.state.Reversi
      }
    },
    created() {
      this.$store.dispatch("initGame")
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
