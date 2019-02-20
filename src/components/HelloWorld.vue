<template>
  <div>
    <button @click="size = 'A4'">A4</button>
    <button @click="size = 'A3'">A3</button>
    <a4-container v-if="size == 'A4'"></a4-container>
    <a3-container v-if="size == 'A3'"></a3-container>
  </div>
</template>

<script>
import '../theme/base.css'
import A4Container from './A4';
import A3Container from './A3';

export default {
  name: 'HelloWorld',
  components:{
    A4Container,
    A3Container
  },
  data () {
    return {
      size:'A4',
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
