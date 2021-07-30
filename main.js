const app = new Vue({
  el: '#app',
  data: {
    show: true,
  },
  methods: {
    now1() {
      return (new Date()).toLocaleString();
    }
  },
  computed: {
    now2() {
      return (new Date()).toLocaleString();
    }
  },
});
