<template>
  <div class="item">
    <figure class="image">
      <template v-if="product.isSale">
        <div class="status">SALE</div>
      </template>
      <img v-bind:src="product.image" alt="">
      <figcaption v-html="product.name"></figcaption>
    </figure>
    <div class="detail">
      <div class="price"><span>{{product.price | number_format}}</span>円（税込）</div>
      <template v-if="product.delv == 0">
        <div class="shipping-fee none">送料無料</div>
      </template>
      <template v-else>
        <div class="shipping-fee">+送料{{product.delv | number_format}}円</div>
      </template>
    </div>
  </div>
</template>

<script>
import './filter.js';

export default {
  name: 'Product',
  props: ['product']
}
</script>

<style scoped>
.item {
  flex: 0 1 250px;
  margin-bottom: 30px;
}

.item .image {
  position: relative;
  text-align: center;
}

.item .image img {
  width: 100%;
  height: auto;
}

.item .status {
  position: absolute;
  border-radius: 50%;
  width: 4em;
  height: 4em;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #bf0000;
  color: #fff;
}

.item .detail {
  text-align: center;
}

.item .price {
  display: inline-block;
}

.item .price span {
  font-size: 180%;
}

.item .shipping-fee {
  display: inline-block;
  background: #f7cd12;
  color: #000;
}

.item .shipping-fee.none {
  background: #bf0000;
  color: #fff;
}
</style>
