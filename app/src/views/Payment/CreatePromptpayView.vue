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
            ease-in-out"
             :class="this.showMobileMenu 
             ? 'relative -translate-x-0' : 'closed-menu'">
          <h3 class="headline-large ml-4 mb6-4">อร่อยโภชนา</h3>
          <SectionHeader label="สำหรับพนักงาน" />
          <NavItem
              v-for="(item, index) in navItems"
              :id="index"
              :label="item.label"
              :active="index == activeId"
              :url="item.router"
              :onClickItem="onClickItem"
              :key="index">
            <span class="material-symbols-outlined">{{item.icon}}</span>
          </NavItem>
        </div>
      </div>

    <div class="basis-3/4">
      <div class="ml-10">
        <div class="flex flex-col">
          <h1 class="text-3xl mb-3">{{ title }}</h1>
          <span class="text-xl mb-5">{{ section }}</span>
        </div>
        <div>
          <label class="inline-flex">
            <input type="text" id="table_number" ref="tableNumber" placeholder="กรอกเลขโต๊ะ"
                   class="text-color border rounded-lg">
            <button @click="deleteInput" class="flex items-center">
              <span class="material-symbols-outlined">cancel</span>
            </button>
          </label>
        </div>
      
        <div class="base-block border-box mt-2">
          <div class="flex-display width-100 fix-grid-display">
            <div class="scroll borderColor mt-5">
              <span class="margin-text text-xl">ใบเสร็จ</span>
              <div v-for="(item, index) in billOrderItem" :key="index">
                <BillOrderItem class="flex justify-center mb-2"
                               :id="index"
                               :image="item.image"
                               :name="item.name"
                               :active="index == activeId"/>
              </div>
            </div>
          
              <div class="borderColor mt-5">
                <h3 class="margin-text text-xl">พร้อมเพย์</h3>
                <img :src="qrCode" style="width: 100%; object-fit: contain">
                <div>
                  <button @click="printBill" class="button-payment button-style mb-4 ml-3"> พิมพ์ </button>
                </div>
              </div>
            </div>
          </div>
      
          <div>
            <button @click="paid" class="button-payment button-style">จ่ายแล้ว</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import NavItem from '@/components/NavBarDrawer/NavItem.vue';
import SectionHeader from '@/components/NavBarDrawer/SectionHeader.vue';
import BillOrderItem from '@/components/BillOrderItem/BillOrderItem.vue';
import {usePaymentStore} from '@/stores/payment.js';
export default {
  setup() {
    const payment_store = usePaymentStore();
    return {payment_store};
  },
  data() {
    return {
      showMobileMenu: false,
      title: 'จ่ายเงิน',
      section: 'เลือกลูกค้า',
      table_number: '',
      qrCode: '',
      error: null,
      payment: '',
      navItems: [
        {label: 'รับลูกค้าใหม่', icon: 'sentiment_satisfied', router: '/employee/new-customer', activeId: 0},
        {label: 'จ่ายเงิน', icon: 'payment', router: '/employee/payment/create-promptpay', activeId: 1},
        {label: 'อาหารที่ต้องเสิร์ฟ', icon: 'room_service', router: '/employee/order/serve', activeId: 0},
        {label: 'อาหารที่ต้องทำ', icon: 'soup_kitchen', router: '/employee/order/order-to-do', activeId: 0},
        {label: 'ออกจากระบบ', icon: 'logout', router: '/logout', activeId:0}
      ],
      loopCount: 5,
      billOrderItem: [
        {amount: 2, name: 'ข้าวมันไก่', price: 60},
        {amount: 1, name: 'ข้าวอบ', price: 50},
        {amount: 1, name: 'ข้าวผัดกระเพรา', price: 55},
        {amount: 1, name: 'ข้าวผัดกุ้ง', price: 60},
        {amount: 1, name: 'สเต๊กเนื้อ', price: 100},
      ],
    };
  },
  components: {
    NavItem,
    SectionHeader,
    BillOrderItem,
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    deleteInput() {
      this.$refs['tableNumber'].value = '';
    },
    printBill() {
      this.$router.push(`/bill`);
    },
    onClickItem(id, url) {
      this.activeId = id;
      if (url != '') {
        this.$router.push(url);
      }
    },
  //   async paid() {
  //     try {
  //       this.error = null;
  //       const payment_id = await this.payment_store.save(this.payment);
  //       if (payment_id) {
  //         this.$router.push(`/payments/${payment_id}`);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       this.error = error.message;
  //     }
  //   },
  //   scroll() {
  //     const element = document.getElementById('yourID');
  //     element.scrollIntoView({behavior: 'smooth', block: 'end'});
  //   },
  // },
  // mounted() {
  //   this.scroll();
  // },
  // computed: {
  //   imagePath() {
  //     return `uploads\products\${this.produit.image}`;
  //   },
  },
};
</script>

<style lang="scss">
.margin-text {
  margin-left: 8px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.button-style {
  margin-top: 8px;
  padding: 10px;
  float: left;
  border-radius: 9999px;
}
.button-payment {
  color: var(--md-sys-color-on-primary);
  background: var(--md-sys-color-primary);
  border-color: var(--md-sys-color-primary);
}

.borderColor {
  border: 1px solid var(--md-sys-color-outline-light);
  border-radius: 15px;
}

.text-color {
  color: var(--md-sys-color-on-primary-dark);
}

.scroll {
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
}

.resize-component{
  width: 100%;
  display: flex;
  flex-direction: column;
}

.border-box {
  box-sizing: border-box;
}

.width-100 {
  width: 100%;
}

.flex-display {
  display: flex;
  flex-direction: column;
  -webkit-box-align: stretch;
  align-items: stretch;
}

.base-block {
  border-radius: 8px;
}

.fix-grid-display{
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}

@media screen and (max-width: 768px) {
  .fix-grid-display {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
  .base-block {
    width: inherit;
    min-width: 100%;
  }
}
</style>
