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
          :active="item.activeId"
          :url="item.router"
          :onClickItem="onClickItem"
          :key="index"
      >
        <span class="material-symbols-outlined">{{item.icon}}</span>
      </NavItem>
    </div>
    </div>

    <div class="basis-3/4 ml-10">
        <div>
          <h3 class="headline-large">รายการโปรโมชัน</h3>
        </div>



      <div class="main-content-promotion-list" >
        <div class="grid justify-items-center create-promotion">
          <button
              class="rounded-full p-1 justify-center"
              @click="goToCreatePromotion()"
          >
            <span class="material-symbols-outlined">add</span>
          </button>
        </div>
        <div v-for="(item, index) in foodCardItems" :key="index">
          <FoodCard
              :id="index"
              :image="item.image"
              :name="item.name"
              :price="item.price"
              :active="index == activeId"
          >
          </FoodCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '../../components/NavBarDrawer/SectionHeader.vue';
import NavItem from '../../components/NavBarDrawer/NavItem.vue';
import FoodCard from '../../components/FoodCard/FoodCard.vue';

export default {
  /*To Do List
*
* - Data -
* ต้องมีการดึงค่าข้อมูล Promotion มาแสดงในรายการอาหารที่แสดง
*
* - Method -
* goToPromotionDetail()
* ต้องมีเมธอดที่พอกดที่ Promotion card แล้วไปยังหน้ารายละเอียดโปรโมชัน
*
* goToCreatePromotion()
* เมธอดนี้เขียนให้แล้วใช้งานได้แล้ว เป็นเมธอดที่กดแล้วไปยังหน้าเพิ่มข้อมูลโปรโมชัน
*
* */
  data() {
    return {
      showMobileMenu: false,
      loopCount: 4,
      navItems: [
        {label: 'ข้อมูลบัญชี', icon: 'account_circle', router: '/management/account/employee-account-list',activeId: 0,},
        {label: 'สรุปข้อมูล', icon: 'signal_cellular_alt', router: '/management/dashboard' ,activeId: 0,},
        {label: 'รายการอาหาร', icon: 'restaurant_menu', router: '/management/menu',activeId: 0,},
        {label: 'โปรโมชัน', icon: 'grid_view', router: '/management/promotion',activeId: 1,},
        {label: 'ออกจากระบบ', icon: 'logout', router: '/logout', activeId:0}
      ],
      foodCardItems: [
      ],
    };
  },
  components: {
    SectionHeader,
    NavItem,
    FoodCard,
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    goToCreatePromotion() {
      this.$router.push(`/management/promotion/create-promotion`);
    },
    onClickItem(id, url) {
      this.activeId = id;
      if (url != '') {
        this.$router.push(url);
      }
    },
  },
};
</script>

<style lang="scss">
div.create-promotion {
  border-radius: 30px;
  background: var(--md-sys-color-primary-container);
  padding: 25px 20px 20px 25px;
}

div.main-content-promotion-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 4px;
}

@media screen and (max-width: 768px){
  div.main-content-promotion-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 4px;
  }
}
@media screen and (max-width: 650px) {
  div.main-content-promotion-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 4px;
  }
}
@media screen and (max-width: 420px){
  div.main-content-promotionlist {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-gap: 4px;
  }
}
</style>
