<template>
  <div class="wrapper">
    <!-- <div class="Teddys">
      <div class="Teddy" v-for="teddy in teddys" :key="name">
        <div class="info">
          <h1>{{teddys.name}}</h1>
          <p>{{teddys.Age}}</p>
        </div>
        <div class="image">
          <img :src="'/src/assets/Girl1.jpg'" />
        </div>
        <div class="price">
          <h2>{{product.price}}</h2>
          <button v-on:click="removeItemsFromCart(product)" class="auto">Remove from Cart</button>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "teddyList",
  props: {
    teddyList: Array
  },
  methods: {
    removeItemsFromCart(teddy) {
      this.$root.$data.teddys.splice(this.$root.$data.teddys.indexOf(teddy), 1);
    },
    searchCart(productID) {
      let count = 0;
      if (this.$root.$data.cart.length) {
        for (let i = 0; i < this.$root.$data.cart.length; i++) {
          if (this.$root.$data.cart[i].id === productID) {
            count += 1;
          }
        }
      }
      return count;
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cartProducts {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.product img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #1d72f2;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}

.price {
  display: flex;
}

button {
  height: 50px;
  background: rgb(184, 17, 17);
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>