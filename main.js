const app = new Vue({
  el: '#app',
  data: {
    pSize: '20px',
    isCapital: true,
    products: [
      {code: 'A01', name: 'プロダクトA'},
      {code: 'B01', name: 'プロダクトB'},
      {code: 'C01', name: 'プロダクトC'},
    ],
    price: 980,
    stock: 10,
  },
});
