Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: /*html*/ `
    <div>
        <span class="tab"
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectedTab = tab"
        >
        {{ tab }}
        </span>

        <review-list :reviews="reviews" v-show="selectedTab === 'Reviews'"></review-list>

        <review-form v-show="selectedTab === 'Make a Review'"></review-form>
    </div>
    `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews",
    };
  },
});
