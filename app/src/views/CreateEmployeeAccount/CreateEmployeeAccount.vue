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
      <div class="flex justify-between">
        <h3 class="headline-large">สร้างบัญชี</h3>
        <button
        class="w-8 h-8 secondary-container rounded-full p-1 justify-center"
        @click="backToEmployeeAccountList()"
        >
        <span class="material-symbols-outlined">
                arrow_back
              </span>
        </button>
      </div>

      <div class="ml-10 mt-10">
        <div class="set-display-column-account ">
          <label class="set-margin text-xl">ชื่อ-นามสกุล</label>
          <input type="text" v-model="user.name" class="input-field-create-employee-account flex justify-center" placeholder="name">
          <label class="label-small">{{ this.nameNoti }}</label>
        </div>

        <div class="set-display-column-account ">
          <label class="set-margin text-xl">ชื่อผู้ใช้</label>
          <input type="text" v-model="user.username" class="input-field-create-employee-account" placeholder="username">
          <label class="label-small">{{ this.usernameNoti }}</label>
        </div>

        <div class="set-display-column-account ">
          <label class="set-margin text-xl">อีเมล</label>
          <input type="text" v-model="user.email" class="input-field-create-employee-account" placeholder="email">
          <label class="label-small">{{ this.emailNoti }}</label>
        </div>

        <div class="set-display-column-account ">
          <label class="set-margin text-xl">รหัสผ่าน</label>
          <input type="password" v-model="user.password" class="input-field-create-employee-account" placeholder="password">
          <label class="label-small">{{ this.passNoti }}</label>
        </div>

        <div class="flex justify-end mb-5">
          <button @click="createAnAccount()" class="button-blue button-style">สร้างบัญชี</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import NavItem from "../../components/NavBarDrawer/NavItem.vue";
import { useEmployeeStore } from "../../stores/employee.js";
import {authAPI} from '../../services/api';

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
  setup() {
    const employee_store = useEmployeeStore()
    const response = null
    return { employee_store }
  },
  name: "App",
  data() {
    return {
      error: null,
      nameNoti : '',
      usernameNoti : '',
      emailNoti : '',
      passNoti : '',
      user: {
        name: '',
        username: '',
        email: '',
        password: '',
      },
      showMobileMenu: false,

      loopCount: 4,
      navItems: [
        {label: 'ข้อมูลบัญชี', icon: 'account_circle', router: '/management/account/employee-account-list',activeId: 1,},
        {label: 'สรุปข้อมูล', icon: 'signal_cellular_alt', router: '/management/dashboard' ,activeId: 0,},
        {label: 'รายการอาหาร', icon: 'restaurant_menu', router: '/management/menu',activeId: 0,},
        {label: 'โปรโมชัน', icon: 'grid_view', router: '/management/promotion',activeId: 0,},
        {label: 'ออกจากระบบ', icon: 'logout', router: '/logout', activeId:0}
      ],
    }
  },
  components: {
    NavItem,
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    async createAnAccount() {
      // console.warn("values: ",this.user.username,this.user.password)
      try {
        this.error = null;
        /**
         *             'name' => 'required|string|max:255',
         *             'username' => 'required|string|unique:users',
         *             'email' => 'required|string|email|max:255|unique:users',
         *             'password' => 'required|string|min:6',
         *             'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
         */
        this.response = await authAPI.registerEmployee(this.user);
        this.$router.push(`/management/account/employee-account-list`);
        if (response.status_code == 201) {
          console.log(response.data);
        }

      } catch (error) {
        // this.nameNoti = '3';
        // this.usernameNoti = this.response.data.username ;
        // this.emailNoti = this.response.data.email;
        // this.passNoti = this.response.data.password;

        console.log(error);
        this.error = error.message;
      }
    },
    backToEmployeeAccountList(){
      this.$router.push(`/management/account/employee-account-list`);
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
.set-margin {
  margin-bottom: 10px;
  margin-top: 10px;
}

.set-display-column-account {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.button-blue {
  color: var(--md-sys-color-on-primary);
  background: var(--md-sys-color-primary);
  border-color: var(--md-sys-color-primary);
}

.button-style {
  margin-top: 8px;
  padding: 10px;
  border-radius: 9999px;
  justify-content: center;
}

.button-blue:hover {
  color: var(--md-sys-color-on-primary);
  background: #2371cd;
  border-color: #1A5EAFFF;
}

.input-field-create-employee-account[type=text], .input-field-create-employee-account[type=password]{
  width: 90%;
  color: var(--md-sys-color-on-primary-dark);
  border: 1px solid var(--md-sys-color-outline-light);
  border-radius: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.borderColor {
  border: 1px solid var(--md-sys-color-outline-light);
  border-radius: 15px;
  align-items: center;
}

.button {
  border-radius: 10px;
}

.set-align {
  align-items: center;
}

.button:hover{
  color: var(--md-sys-color-on-primary);
  background: var(--md-sys-color-error);
  border-color: var(--md-sys-color-primary);
}

.nav-menu-management {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
.nav-content {
  display: flex;
  flex-direction: column;
  width: 300px;
}
i.management {
  display: none;
}
.main-content-management {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 768px) {
  .nav-menu-management {
    display: inline;
  }
  .closed-menu {
    opacity: 0;
    height: 0;
    padding: 0;
  }
  .nav-content {
    flex-direction: column;
    z-index: 100;
    position: relative;
    transition: all 0.2s ease-out;
  }
  i.management {
    display: block;
    padding: 0 10px 10px 0;
  }
  .main-content-management {
    display: flex;
    flex-direction: column;
  }
}
</style>
