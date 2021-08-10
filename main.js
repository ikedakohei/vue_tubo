const app = new Vue({
  el: '#app',
  data: {
    color: '#000000',
    red: 0,
    green: 0,
    blue: 0,
  },
  computed: {
    colorElement() {
      return [this.red, this.green, this.blue];
    }
  },
  watch: {
    colorElement(newRGB, oldRGB) {
      const r = ('00' + newRGB[0].toString(16).toUpperCase()).slice(-2);
      const g = ('00' + newRGB[1].toString(16).toUpperCase()).slice(-2);
      const b = ('00' + newRGB[2].toString(16).toUpperCase()).slice(-2);
      this.color = `#${r}${g}${b}`;
    },
    color(newColor, oldColor) {
      this.red = parseInt(newColor.substr(1, 2), 16);
      this.green = parseInt(newColor.substr(3, 2), 16);
      this.blue = parseInt(newColor.substr(5, 2), 16);
    }
  }
});
