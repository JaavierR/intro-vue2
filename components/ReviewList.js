Vue.component("review-list", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: /*html*/ `
    <div>
        <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="(review, index) in reviews" :key="index">
                  <p>{{ review.name }}</p>
                  <p>Rating: {{ review.rating }}</p>
                  <p>{{ review.review }}</p>
                  <p>Recommend? {{ review.recommend }}</p>
                </li>
            </ul>
    </div>
    `,
});
