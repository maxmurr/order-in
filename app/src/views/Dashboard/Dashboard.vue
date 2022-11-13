<template>
  <div class="nav-menu-management">
    <div class="flex">
      <i class="management">
        <button @click="showMenu()">
        <span class="material-symbols-outlined">
          menu
        </span>
        </button>
      </i>
      <div class="
          w-64
          absolute
          inset-y-0
          left-0
          md:relative md:-translate-x-0
          transform
          -translate-x-full
          transition
          duration-200
          ease-in-out
          "
           :class="this.showMobileMenu ? 'relative -translate-x-0' : 'closed-menu'"
      >
        <h3 class="headline-small ml-4 mb6-4">ชื่อร้าน</h3>
        <NavItem
            v-for="(item, index) in navItems"
            :id="index"
            :label="item.label"
            :url="item.router"
            :active="item.activeId"
            :onClickItem="onClickItem"
            :key="index"
        >
          <span class="material-symbols-outlined">{{item.icon}}</span>

        </NavItem>
      </div>
    </div>

    <div class="basis-3/4 ml-10">
      <div>
        <h3 class="headline-large">Dashboard</h3>
      </div>
      <div class="main-content-dashboard mr-20">
        <div class="topic">
          <h3 class="body-large ml-3">ความพึงพอใจต่ออาหารจากการประเมินของลูกค้า</h3>
        </div>
        <div class="block-body">
          <GChart
              type="PieChart"
              :options="options"
              :data="ratingStat"
          />
        </div>

        <div class="topic">
          <h3 class="body-large ml-3">รีวิวจากลูกค้า</h3>
        </div>

        <div class="scroller">
          <div class="review-container"
               v-for="(review, index) in reviews" :key="index"
          >
            <p class="body-medium"> {{ review.feedback }} </p>
          </div>
        </div>

        <div class="topic">
          <h3 class="body-large ml-3">รายรับภายในร้าน</h3>
        </div>

        <div class="block-body">
          <GChart
              type="Histogram"
              :options="options"
              :data="ratingStat"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavItem from "../../components/NavBarDrawer/NavItem.vue";
import BannerCard from "../../components/BannerCard.vue";
import { GChart } from "vue-google-charts";
import {useRatingStore} from "../../stores/rating";
import {useReviewStore} from "../../stores/review";

export default {
  name: "App",
  setup() {
    const ratingStore = useRatingStore();
    const reviewStore = useReviewStore();
    return {ratingStore, reviewStore};
  },
  created() {
    this.getData();
  },
  data() {
    return {
      showMobileMenu: false,
      loopCount: 4,
      ratings: [],
      reviews: [],
      navItems: [
        {label: 'ข้อมูลบัญชี', icon: 'account_circle', router: '/management/account/employee-account-list',activeId: 0,},
        {label: 'สรุปข้อมูล', icon: 'signal_cellular_alt', router: '/management/Dashboard' ,activeId: 1,},
        {label: 'รายการอาหาร', icon: 'restaurant_menu', router: '/management/menu',activeId: 0,},
        {label: 'โปรโมชัน', icon: 'grid_view', router: '/management/promotion',activeId: 0,},
        {label: 'ออกจากระบบ', icon: 'logout', router: '/logout', activeId:0}
      ],
      options: {
        width: 700,
        height: 500,
        background: "var(--md-sys-color-surface)",
      },
    }
  },
  components: {
    NavItem,
    GChart,
  },
  methods: {
    async getData() {
      await this.ratingStore.fetch();
      await this.reviewStore.fetch();
      this.ratings = this.ratingStore.ratings;
      this.reviews = this.reviewStore.reviews;
    },
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    onClickItem(id, url) {
      this.activeId = id;
      this.$router.push(url);
    },
  },
  computed: {
    ratingStat() {
      const data = this.ratings.reduce((prev, curr) => {
        const key = `Rating ${curr.count}`
        if (!prev[key]) {
          prev[key] = 0;
        }
        prev[key]++;
        return prev;
      }, {});
      return [['Rating', 'Score'], ...Object.entries(data)]
    }
  }
};
</script>

<style lang="scss">
div.topic {
  background-color: var(--md-sys-color-primary-container);
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
}
div.block-body {
  background-color: var(--md-sys-color-surface);
  padding: 10px;
  width: 100%;
}
div.review-container {
  background-color: var(--md-sys-color-surface);
  border-radius: 10px;
  border: 2px solid;
  border-color: #8e9099;
  padding: 10px;
  margin: 5px 5px 5px 5px;
}
.scroller {
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
  margin-bottom: 10px;
}

.main-content-dashboard {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 768px) {
  .main-content-dashboard {
    display: flex;
    flex-direction: column;
  }
}
</style>
