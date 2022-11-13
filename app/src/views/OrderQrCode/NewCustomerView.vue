<!-- /TODO:
  ใช้ข้อมูล
  table:
    - table_id
    - table_available = สถานะว่าโต๊ะนั้นว่างมั้ย
    - table_qrcode = qrcode ไปยังหน้าสั่งอาหารของtableนั้นๆ

  methods:
  อยู่ในcomponent
  -TableItem.vue > goToOrderQrCode() = กดเลือกโต๊ะที่ต้องการแล้วจะส่งไปยังหน้า
  OrderQrCodeView.vue (/new-customer/order-qrcode)

  navbar>
  -showMenu() = กดเพื่อให้โชว์navbarที่ซ่อนไว้
  อยู่ในcomponents
  -NavBarEmployee.vue > onClickItem() = ส่งไปแต่ละหน้าตามurl
/ -->
<template>
  <div class="relative">
    <div class="main-content-employee-view">
      <div class="flex">
        <i>
          <button @click="showMenu()">
            <span class="material-symbols-outlined"> menu </span>
          </button>
        </i>
        <div
        class="
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
        :class="
            this.showMobileMenu ? 'relative -translate-x-0' : 'closed-menu'
            "
        >
        <h3 class="headline-large ml-4 mb6-4">อร่อยโภชนา</h3>
          <SectionHeader label="สำหรับพนักงาน" />
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

      <div class="p-4 flex-grow">
        <h1 class="headline-medium">รับลูกค้าใหม่</h1>
        <h1 class="headline-small">เลือกโต๊ะ</h1>
        <div class="flex main-content-table-list mr-20">
          <div
            class="grid justify-items-center mt-8"
            v-for="(table, index) in tables"
            :key="index"
          >
            <TableItem
              :table_id="table.id"
              :table_number="table.table_number"
              :available="table.available"
              :key="index"
            >
            </TableItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavItem from '../../components/NavBarDrawer/NavItem.vue';
import SectionHeader from '../../components/NavBarDrawer/SectionHeader.vue';
import TableItem from '../../components/Table/TableItem.vue';
import {useTableStore} from '../../stores/table';
export default {
  setup() {
    const tableStore = useTableStore();
    return {tableStore};
  },
  created() {
    this.fetchTables();
  },
  components: {
    SectionHeader,
    NavItem,
    TableItem,
  },
  methods: {
    onClickItem(id, url) {
      this.activeId = id;
      if (url != '') {
        this.$router.push(url);
      }
    },
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    async fetchTables() {
      await this.tableStore.fetch();
      this.tables = this.tableStore.tables.data;
    },
  },

  data() {
    return {
      showMobileMenu: false,
      tables: [],

      navItems: [
        {label: 'รับลูกค้าใหม่', icon: 'sentiment_satisfied', router: '/employee/new-customer',activeId:1},
        {label: 'จ่ายเงิน', icon: 'payment', router: '/employee/payment/create-promptpay',activeId:0},
        {label: 'อาหารที่ต้องเสิร์ฟ', icon: 'room_service', router: '/employee/order/serve',activeId:0},
        {label: 'อาหารที่ต้องทำ', icon: 'soup_kitchen', router: '/employee/order/order-to-do',activeId:0},
        {label: 'ออกจากระบบ', icon: 'logout', router: '/logout', activeId:0}
      ],
    };
  },
};
</script>


<style lang="scss">
div.main-content-table-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-gap: 4px;
}

@media screen and (max-width: 1000px) {
  div.main-content-table-list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-gap: 4px;
  }
}

@media screen and (max-width: 890px) {
  div.main-content-table-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 4px;
  }
}
@media screen and (max-width: 650px) {
  div.main-content-table-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 4px;
  }
}
@media screen and (max-width: 420px) {
  div.main-content-table-list {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-gap: 4px;
  }
}
</style>
