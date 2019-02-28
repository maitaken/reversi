<template>
  <div 
    class="result-content"
    >
    <div v-if="info.isGameOver">
      <span v-if="info.blackCount == info.whiteCount">
        引き分け
      </span>
      <span v-else-if="info.blackCount > info.whiteCount">
        黒の勝ち
      </span>
      <span v-else>
        白の勝ち
      </span>
      <div class="init-button" @click="initGame">
        もう一回
      </div>
    </div>
    <table v-else>
      <tr>
        <td>黒の個数</td>
        <td>{{info.blackCount}}</td>
      </tr>
      <tr>
        <td>白の個数</td>
        <td>{{info.whiteCount}}</td>
      </tr>
      <tr>
        <td>現在のプレイヤー</td>
        <td>{{1 + info.order}}</td>
      </tr>
    </table>
  </div>

</template>

<script>
export default {
  computed:  {
    info:function() {
      return this.$store.state.Reversi.gameInfo
    }
  },
  methods: {
    initGame:function(){
      this.$emit("init")
    }
  }
}
</script>

<style scoped>
table,div{
  height: 6em;
}

table tr td{
  width:10em;
}

.result-content{
  position: relative;
  width: 100%;
  background-color: #000;
  color: #fff;
}

div span{
  font-size: 2em;
  line-height: 3em;
}

.init-button{
  position: absolute;
  height: 4em;
  width: 6em;
  line-height: 4em;
  right: 1em;
  bottom: 1em;
  text-align: center;
  border-radius: 0.5em;
  background-color: #fff;
  color: #000;
}

.init-button:hover{
  transition-property: background-color color;
  transition-duration: 0.5s;
  background-color: #000;
  color: #fff;
}
</style>
