Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: /*html*/ `
    <div class="product">
    <div class="product-image">
      <img :src="image" alt="green socks" />
    </div>
    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{ 'out-of-stock': !inStock }">Out of Stock</p>
      <p>{{ sale }}</p>
      <p>Shipping: {{ shipping }}</p>

      <product-details :details="details"></product-details>

      <div
        v-for="(variant, index) in variants"
        :key="variant.id"
        class="color-box"
        :style="{ backgroundColor: variant.color }"
        @mouseover="updateProduct(index)"
      ></div>

      <button
        @click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
      >
        Add to Cart
      </button>

      <button
        @click="removeFromCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
      >
        Remove From Cart
      </button>
    </div>

    <product-tabs :reviews="reviews"></product-tabs>

  </div>
      `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      reviews: [],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/green-socks.jpg",
          quantity: 10,
          onSale: true,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/blue-socks.jpg",
          quantity: 0,
          onSale: false,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    sale() {
      if (this.variants[this.selectedVariant].onSale) {
        return `${this.title} are on sale`;
      } else {
        return `${this.title} are not on sale`;
      }
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
  mounted() {
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });
  },
});
