const app = new Vue({
  el: '#app',
  data: {
    price: 1000
  },
  filters: {
    number_format(val) {
      return val.toLocaleString();
    },
    unit(val) {
      return val + '円';
    },
  }
});
