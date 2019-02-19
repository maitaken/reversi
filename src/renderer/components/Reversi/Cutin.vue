<template>
  <div id="cutin-content" :class="{cutin1:order,cutin2:!order}">
    <h4>
      プレイヤー {{order + 1}}の番です
    </h4>
  </div>
</template>

<script>
export default {
  computed:{
    order:function() {
      return this.$store.state.Reversi.order
    }
  }
}
</script>

<style scoped>
/* 改善の余地あり */
#cutin-content{
  position: absolute;
  background-color: rgb(186, 39, 39);
  top:80%;
  transform: translate(120%,-50%);
  text-align: center;
  width: 100%;
  height: 4em;

  /* border:outset 1em rgb(13, 255, 0); */

  opacity: 0.9;
}

.cutin1{
  animation: cutin 2s ease-in-out  0s 1 alternate both;
}
.cutin2{
    animation: cutin2 2s ease-in-out 0s 1 alternate both;
}

@keyframes cutin {
  0%{
    transform: translate(120%,0);
  }
  30%{
    transform: translate(10%,0);
  }
  70%{
    transform: translate(10%,0);
  }
  100%{
    transform: translate(-120%,0);
  }
}

@keyframes cutin2 {
  0%{
    transform: translate(120%,0);
  }
  30%{
    transform: translate(10%,0);
  }
  70%{
    transform: translate(10%,0);
  }
  100%{
    transform: translate(-120%,0);
  }
}
</style>
