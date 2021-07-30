const app = new Vue({
  el: '#app',
  data: {
    message: '',
    stock: 10,
  },
  methods: {
    onDeleteItem() {
      this.stock--;
    },
  },
  computed: {
    statusMessage() {
      if (this.stock === 0) {
        return this.message = '売り切れ';
      }
      return this.message = '';
    },
  },
  watch: {
    statusMessage() {
      console.log(`商品のステータスが変化しました: ${this.stock}`)
    }
  }
});
