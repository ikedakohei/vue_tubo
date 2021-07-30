const app = new Vue({
  el: '#app',
  data: {
    point: { x: 0, y: 0 }
  },
  created() {
    addEventListener('mousemove', this.mousemoveHandler);
  },
  beforeDestroy() {
    removeEventListener('mousemove', this.mousemoveHandler);
  },
  methods: {
    mousemoveHandler($event) {
      this.point.x = $event.clientX;
      this.point.y = $event.clientY;
    }
  },
});
