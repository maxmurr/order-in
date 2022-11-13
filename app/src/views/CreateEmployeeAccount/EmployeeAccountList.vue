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
        <h3 class="headline-large">ข้อมูลบัญชี</h3>
      </div>

      <div class="main-content-account ">
        <div class="grid justify-items-end mb-5">
          <button class="button-create-account body-large" @click="goToCreateEmployeeAccount()">
            เพิ่มบัญชี
          </button>
        </div>
      </div>

      <div>
        <AccountItem
            v-for="(item, index) in accountItems"
            :id="index"
            :name="item.name"
            :role="item.role"
            :active="item.activeId"
            :onClickItem="onClickItem"
            :key="index"
        >

        </AccountItem>
      </div>

    </div>
  </div>
</template>

<script>
import NavItem from "../../components/NavBarDrawer/NavItem.vue";
import AccountItem from "../../components/AccountItem/AccountItem.vue";
export default {
  /*To Do List
 *
 * - Data -
 * ต้องมีการดึงค่าข้อมูล Review มาแสดงในรายการอาหารที่แสดง
 *
 * - Method -
 *ไม่แน่ใจว่าต้องใช้ไรเพิ่มเติมอีกอะ แต่ในหน้าคือจะประกอบด้วย 3 ส่วน
 * ส่วน 1 Piechart ข้อมูล rating
 * ส่วน 2 แสดงข้อมูล reviews ทั้งหมด นี่ทำให้เป็น scollbar ไว้ให้แล้วแค่่ดึงดึงข้อมูลมาวน
 * ส่วน 3 ฺBar chart รายรับรายจ่ายในแต่ละวัน
 * */
  name: "App",
  data() {
    return {
      showMobileMenu: false,
      loopCount: 4,
      navItems: [
        {label: 'ข้อมูลบัญชี', icon: 'account_circle', router: '/management/account/employee-account-list',activeId: 1,},
        {label: 'สรุปข้อมูล', icon: 'signal_cellular_alt', router: '/management/dashboard' ,activeId: 0,},
        {label: 'รายการอาหาร', icon: 'restaurant_menu', router: '/management/menu',activeId: 0,},
        {label: 'โปรโมชัน', icon: 'grid_view', router: '/management/promotion',activeId: 0,},
        {label: 'ออกจากระบบ', icon: 'logout', router: '/logout', activeId:0}
      ],
      accountItems: [
        {name: 'nanazen', role:'manager'},
        {name: 'frsh', role:'employee'},
        {name: 'unmany', role:'employee'},
        {name: 'jaemin', role:'employee'},
      ],
    }
  },
  components: {
    NavItem,
    AccountItem,
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    goToCreateEmployeeAccount(){
      this.$router.push(`/management/account/create-employee-account`);
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
.button-create-account{
  color: var(--md-sys-color-on-tertiary);
  background: var(--md-sys-color-tertiary);
  border-color: var(--md-sys-color-tertiary);
  padding: 10px;
  border-radius: 9999px;
  justify-content: center;
}
</style>
