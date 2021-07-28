// 数値を通貨書式「#,###,###」に変換するフィルター
Vue.filter('number_format', function(val) {
  return val.toLocaleString();
});

// 自動見積コンポーネント
var app = new Vue({
  el: '#app',
  data: {
    // 消費税率
    taxRate: 0.08,
    // 制作したいムービー
    movieType: '余興ムービー',
    // 基本料金（税抜き）
    basePrice: 30000,
    // 割増料金
    addPrice1: 5000,  // 納期が1ヵ月未満の場合
    addPrice2: 10000, // 納期が3週間未満の場合
    addPrice3: 15000, // 納期が2週間未満の場合
    addPrice4: 20000, // 納期が1週間未満の場合
    addPrice5: 40000, // 納期が3日後の場合
    addPrice6: 45000, // 納期が2日後の場合
    addPrice7: 50000, // 納期が翌日の場合
    // オプション料金（税抜き）
    optPrice: 0,
    // 合計金額（税抜き）
    totalPrice: 0,
    // 挙式日（日付）
    wedding_date: '',
    // DVD仕上がり予定日（日付）
    delivery_date: '',
    // オプション「BGM手配」
    opt1_use: false,              // true：利用する、false：利用しない
    opt1_price: 5000,             // 料金（税抜き）
    // オプション「撮影」
    opt2_use: false,              // true：利用する、false：利用しない
    opt2_price: 5000,             // 料金（税抜き）
    // オプション「DVD盤面印刷」
    opt3_use: false,              // true：利用する、false：利用しない
    opt3_price: 5000,             // 料金（税抜き）
    // オプション「写真スキャニング」
    opt4_num: 0,                  // 利用枚数
    opt4_price: 500,              // 料金（税抜き）
  },
  methods: {
    // 税抜金額を税込金額に変換するメソッド
    incTax: function(untaxed) {
      return Math.floor(untaxed * (1 + this.taxRate));
    },
    // 日付の差を求めるメソッド
    getDateDiff: function(dateString1, dateString2) {
      // 日付を表す文字列から日付オブジェクトを生成
      var date1 = new Date(dateString1);
      var date2 = new Date(dateString2);
      // 2つの日付の差分（ミリ秒）を計算
      var msDiff  = date1.getTime() - date2.getTime();
      // 求めた差分（ミリ秒）を日付に変換
      // 差分÷(1000ミリ秒×60秒×60分×24時間)
      return Math.ceil(msDiff / (1000 * 60 * 60 *24));
    },
    // 日付をYYYY-MM-DDの書式で返すメソッド
    formatDate: function(dt) {
      var y = dt.getFullYear();
      var m = ('00' + (dt.getMonth()+1)).slice(-2);
      var d = ('00' + dt.getDate()).slice(-2);
      return (y + '-' + m + '-' + d);
    }
  },
  computed: {
    // オプション「BGM手配」の税込金額を返す算出プロパティ
    taxedOpt1: function() {
      return this.incTax(this.opt1_price);
    },
    // オプション「撮影」の税込金額を返す算出プロパティ
    taxedOpt2: function() {
      return this.incTax(this.opt2_price);
    },
    // オプション「DVD盤面印刷」の税込金額を返す算出プロパティ
    taxedOpt3: function() {
      return this.incTax(this.opt3_price);
    },
    // オプション「写真スキャニング」の税込金額を返す算出プロパティ
    taxedOpt4: function() {
      return this.incTax(this.opt4_price);
    },
    // 基本料金（税込）を返す算出プロパティ
    taxedBasePrice: function() {
      // 割増料金
      var addPrice = 0;
      // 納期までの残り日数を計算
      var dateDiff = this.getDateDiff(this.delivery_date, (new Date()).toLocaleString());
      // 割増料金を求める
      if (21 <= dateDiff && dateDiff < 30) {
        // 納期が1ヵ月未満の場合
        addPrice = this.addPrice1;
      }
      else if (14 <= dateDiff && dateDiff < 21) {
        // 納期が3週間未満の場合
        addPrice = this.addPrice2;
      }
      else if (7 <= dateDiff && dateDiff < 14) {
        // 納期が2週間未満の場合
        addPrice = this.addPrice3;
      }
      else if (3 < dateDiff && dateDiff < 7) {
        // 納期が1週間未満の場合
        addPrice = this.addPrice4;
      }
      else if (dateDiff == 3) {
        // 納期が3日後の場合
        addPrice = this.addPrice5;
      }
      else if (dateDiff == 2) {
        // 納期が2日後の場合
        addPrice = this.addPrice6;
      }
      else if (dateDiff == 1) {
        // 納期が翌日の場合
        addPrice = this.addPrice7;
      }
      // 基本料金（税込）を返す
      return this.incTax(this.basePrice + addPrice);
    },
    // オプション料金（税込）を返す算出プロパティ
    taxedOptPrice: function() {
      // オプション料金
      var optPrice = 0;
      // BGM手配
      if (this.opt1_use) { optPrice += this.opt1_price; }
      // 撮影
      if (this.opt2_use) { optPrice += this.opt2_price; }
      // DVD盤面印刷
      if (this.opt3_use) { optPrice += this.opt3_price; }
      // 写真スキャニング
      if (this.opt4_num == '') { this.opt4_num = 0; }
      optPrice += this.opt4_num * this.opt4_price;
      // オプション料金（税込）を返す
      return this.incTax(optPrice);
    },
    // 合計金額（税込）を返す算出プロパティ
    taxedTotalPrice: function() {
      // 基本料金（税込）とオプション料金（税込）の合計を返す
      return (this.taxedBasePrice + this.taxedOptPrice);
    },
    // 明日の日付をYYYY-MM-DDの書式で返す算出プロパティ
    tommorow: function() {
      var dt = new Date();
      dt.setDate(dt.getDate() + 1);
      return this.formatDate(dt);
    }
  },
  created: function() {
    // 今日の日付を取得
    var dt = new Date();
    // 挙式日に2ヵ月後の日付を設定
    dt.setMonth(dt.getMonth() + 2);
    this.wedding_date = this.formatDate(dt);
    // DVD仕上がり予定日に、挙式日の１週間前の日付を設定
    dt.setDate(dt.getDate() - 7);
    this.delivery_date = this.formatDate(dt);
  }
});
