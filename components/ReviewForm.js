Vue.component("review-form", {
  template: /*html*/ `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>

        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
            </select>
        </p>

        <h3 for="recommend">Would you recommend this product</h3>
        <div>
        <label for="recommend-yes">Yes</label>
          <input id="recommend-yes" type="radio" value="Yes" v-model="recommend">
        </div>

        <div>
        <label for="recommend-no">No</label>
          <input id="recommend-no" type="radio" value="No" v-model="recommend">
        </div>

        <p>
          <input type="submit" value="Submit">
        </p>

    </form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.rating && this.review && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };

        eventBus.$emit("review-submitted", productReview);

        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        this.errors = [];
        if (!this.name) this.errors.push("Name required.");
        if (!this.rating) this.errors.push("Raiting required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.recommend) this.errors.push("Recommend required.");
      }
    },
  },
});
