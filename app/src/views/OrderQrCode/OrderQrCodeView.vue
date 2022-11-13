<!-- /TODO:
  ใช้ข้อมูล
  table:
    - table_id
    - table_available
    - table_qrcode = qrcode ไปยังหน้า /menu ของtable นั้นๆ

  methods:
  -onclickdone() = เปลี่ยน table_available ของโต๊ะที่เลือกเป็น false
  แล้วกลับไปหน้า /new-customer

  navbar>
  -showMenu() = กดเพื่อให้โชว์navbarที่ซ่อนไว้
  อยู่ในcomponents
/ -->
<template>
  <div class="relative">
    <div class="main-content-employee-view">
      <div class="flex">
        <i>
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
        ease-in-out" :class="this.showMobileMenu
        ? 'relative -translate-x-0' : 'closed-menu'">
          <h3 class="headline-large ml-4 mb6-4">อร่อยโภชนา</h3>
          <SectionHeader label="สำหรับพนักงาน" />
          <NavItem v-for="(item, index) in navItems" :id="index" :label="item.label" :active="item.activeId"
            :url="item.router" :onClickItem="onClickItem" :key="index">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </NavItem>
        </div>
      </div>

      <div class="flex-grow">
        <h1 class="headline-medium">รับลูกค้าใหม่</h1>
        <h1 class="headline-small mb-5">Qr-code ให้กับลูกค้า</h1>
        <div class="text-center">
          <p class="mb-4 headline-small">โต๊ะ {{ table_number }}</p>
          <div style="margin-left: 15%; object-fit: contain;">
            <div>
              <vue-qrcode v-if="qrValue" v-bind:value="qrValue" v-bind:scale="qrScale" v-bind:errorCorrectionLevel="correctionLevel"
              class="border" style="width: 80%; object-fit: contain;" />
            </div>
          </div>
          <div class="m-6">
            <a class="headline-small button" :href="qrValue">CLICK!</a>
          </div>

          <div class="p-4 float-right">
            <button class="
                text-center
                button1
                primary-container
                " @click="onclickdone">
              <span class="material-symbols-outlined"> done </span>
              เสร็จ
            </button>
          </div>     
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import NavItem from '../../components/NavBarDrawer/NavItem.vue';
import SectionHeader from '../../components/NavBarDrawer/SectionHeader.vue';
import VueQrcode from 'vue-qrcode';
import {useAuthStore} from "../../stores/auth.js";

export default {
  setup() {
    const authStore = useAuthStore();
    return {authStore};
  },
  mounted(){
    this.table_id = this.$route.query.table_id;
    this.table_number = this.$route.query.table_number;
    //
    this.getCustomerAccount();
  },
  components: {
    NavItem,
    SectionHeader,
    VueQrcode
  },
  methods: {
    onclickdone() {
      this.$router.push('/employee/new-customer');
    },
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    onClickItem(id, url) {
      this.activeId = id;
      if (url != '') {
        this.$router.push(url);
      }
    },

    async getCustomerAccount () {
      this.customer = await this.authStore.addCustomer(this.table_id);
      const {username, password} = this.customer.customerLogin
      const toRoute =this.$router.resolve({name: 'Login', query: {u: username, p: password}});
      const toUrl = new URL(toRoute.href, window.location.origin).href;
      this.qrValue = toUrl;
      console.log(this.customer.customerLogin);
    }
  },

  data() {
    return {
      //qrcode
      qrValue: null,
      qrScale: 10,
      correctionLevel: "H",
      customer: {},
      table_number: {},
      showMobileMenu: false,
      navItems: [
        { label: 'รับลูกค้าใหม่', icon: 'sentiment_satisfied', router: '/employee/new-customer', activeId: 1 },
        { label: 'จ่ายเงิน', icon: 'payment', router: '/employee/payment/create-promptpay', activeId: 0 },
        { label: 'อาหารที่ต้องเสิร์ฟ', icon: 'room_service', router: '/employee/order/serve', activeId: 0 },
        { label: 'อาหารที่ต้องทำ', icon: 'soup_kitchen', router: '/employee/order/order-to-do', activeId: 0 },
        {label: 'ออกจากระบบ', icon: 'logout', router: '/logout', activeId:0}
      ],
    };
  },
};
</script>

<style lang="scss">
div.main-content-employee-view {
  display: flex;
}

.nav-menu {
  display: flex;
}

.nav-content {
  display: flex;
  flex-direction: column;
  width: 300px;
}

i {
  display: none;
}

@media screen and (max-width: 768px) {
  .nav-menu {
    padding-top: 10px;
    position: absolute;
    width: 60%;
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

  i {
    display: block;
    text-align: right;
    padding: 0 10px 10px 0;
  }

  div.main-content-employee-view {
    display: inline;
  }
}

@media screen and (max-width: 650px) {
  div.main-content-employee-view {
    display: inline;
  }
}

@media screen and (max-width: 420px) {
  div.main-content-employee-view {
    display: inline;
  }
}
</style>
