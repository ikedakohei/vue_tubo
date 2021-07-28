<template>
  <div id="app">
    <!--main.htmlから移植-->
    <product-list v-bind:products="products"></product-list>
  </div>
</template>

<script>
// HelloWorld.vue => product-list.vue に変更
import productList from './components/product-list.vue'

export default {
  name: 'app',
  components: {
    'product-list': productList
  },
  data: function() {
    return {
      // main.jsから移植
      products: [
        { id: 1, name: 'Michael<br>スマホケース', price: 1580,
          image: require('./assets/images/01.jpg'), delv: 0, isSale: true },
        { id: 2, name: 'Raphael<br>スマホケース', price: 1580,
          image: require('./assets/images/02.jpg'), delv: 0, isSale: true },
        { id: 3, name: 'Gabriel<br>スマホケース', price: 1580,
          image: require('./assets/images/03.jpg'), delv: 240, isSale: true },
        { id: 4, name: 'Uriel<br>スマホケース', price: 980,
          image: require('./assets/images/04.jpg'), delv: 0, isSale: true },
        { id: 5, name: 'Ariel<br>スマホケース', price: 980,
          image: require('./assets/images/05.jpg'), delv: 0, isSale: false },
        { id: 6, name: 'Azrael<br>スマホケース', price: 1580,
          image: require('./assets/images/06.jpg'), delv: 0, isSale: false }
      ]
    }
  }
}
</script>

<style>
/* main.cssから移植 */
body {
  background: #000;
  color: #fff;
}
</style>
