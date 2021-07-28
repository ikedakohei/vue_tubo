import Vue from 'vue';

// 数値を通貨書式「#,###,###」に変換するフィルター
Vue.filter('number_format', function(val) {
  return val.toLocaleString();
});
