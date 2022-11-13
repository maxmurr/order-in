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
      <SectionHeader label="อร่อยโภชนา" />
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
        <h3 class="headline-large mb-10">เพิ่มโปรโมชัน</h3>
        <button
            class="w-8 h-8 secondary-container rounded-full p-1 justify-center"
            @click="backToPromotionList()"
        >
              <span class="material-symbols-outlined">
                arrow_back
              </span>
        </button>
        </div>


      <div class="main-content-create-management">
        <div class="basis-1/4 mb-8">
          <div v-if="previewImage">
            <div>
              <img class="preview my-3" :src="previewImage" alt="" />
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <label class="btn btn-default p-0">
                <input
                    type="file"
                    accept="image/*"
                    ref="file"
                    name="image"
                    @change="selectImage"
                />
              </label>
            </div>
          </div>
          <div v-if="message" class="alert alert-secondary" role="alert">
            {{ message }}
          </div>
        </div>


        <div class="basis-3/4 ml-5">
          <h3 class="body-large">รหัสส่วนลด</h3>
          <input type="text" class="input-create-menu" v-model="promotion.promotion_code">
          <h3 class="body-large">ชื่ออาหาร</h3>
          <input type="text" class="input-create-menu" v-model="promotion.name">
          <h3 class="body-large">คำอธิบายโปรโมชัน</h3>
          <input type="text" class="input-create-menu" v-model="promotion.description">
          <h3 class="body-large">ราคาโปรโมชัน</h3>
          <input type="text" class="input-create-menu" v-model="promotion.discount_amount">
          <h3 class="body-large">วันเริ่มโปรโมชัน</h3>
          <input type="text" class="input-create-menu" v-model="promotion.begin_useable_date">
          <h3 class="body-large">วันสิ้นสุดโปรโมชัน</h3>
          <input type="text" class="input-create-menu" v-model="promotion.end_useable_date">
        </div>
      </div>
      <div class="grid justify-items-end mb-10">
        <button
            class="button-create-promotion body-large"
            :disabled="!currentImage"
            @click="saveNewPromotion()"
        >
          เพิ่มโปรโมชัน
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '../../components/NavBarDrawer/SectionHeader.vue';
import NavItem from '../../components/NavBarDrawer/NavItem.vue';
import FoodCard from '../../components/FoodCard/FoodCard.vue';
import UploadService from '../../services/UploadFilesService.js';
import { promotionAPI } from "../../services/api.js";

export default {

  /*To Do List
*
* - Data -
* ต้องมีการเก็บค่าข้อมูลลง Food (เอาชื่ออาหารมาใช้ลิ้งกับข้อมูลโปรโมชันอะ) กับ Promotion
*
* - Method -
* saveNewPromotion()
* เป็นเมธอดที่ใช้กับ button ซึ่งพอกดแล้วจะต้องบันทึกข้อมูลที่กรอกมาไปเก็บไว้ที่ DB
* ทำการเซฟรูปภาพ (นี่ก้อปโค้ดเซฟรูปภาพในเน็ตมาแปะไว้ให้แล้วน่าจะใช้ได้เลย)
* และทำการลิ้งไปยังหน้ารายละเอียดโปรโมชันของข้อมูลที่เพิ่งกรอกเข้ามา
*
* */
  data() {
    return {
      showMobileMenu: false,
      currentImage: undefined,
      previewImage: undefined,

      progress: 0,
      message: '',

      imageInfos: [],

      selectedFile: null,
      navItems: [
        {label: 'ข้อมูลบัญชี', icon: 'account_circle', router: '/management/account/employee-account-list',activeId: 0,},
        {label: 'สรุปข้อมูล', icon: 'signal_cellular_alt', router: '/management/dashboard' ,activeId: 0,},
        {label: 'รายการอาหาร', icon: 'restaurant_menu', router: '/management/menu',activeId: 0,},
        {label: 'โปรโมชัน', icon: 'grid_view', router: '/management/promotion',activeId: 1,},
        {label: 'ออกจากระบบ', icon: 'logout', router: '/logout', activeId:0}
      ],
      promotion: {
        promotion_code: null,
        name: null,
        description: null,
        discount_amount: null,
        begin_useable_date: null,
        end_useable_date: null,
        image: null,
      },
    };
  },
  methods: {
    async saveNewPromotion() {
      try {
        const fd = new FormData();
        fd.append('promotion_code', this.promotion.promotion_code)
        fd.append('name', this.promotion.name)
        fd.append('description', this.promotion.description)
        fd.append('discount_amount', this.promotion.discount_amount)
        fd.append('begin_useable_date', this.promotion.begin_useable_date)
        fd.append('end_useable_date', this.promotion.end_useable_date)
        fd.append('image', this.currentImage)

        this.error = null;
        const response = await promotionAPI.saveNew(fd);
        this.$router.push(`/management/promotion`);
        if (response.status_code == 201) {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        this.error = error.message;
      }
    },
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    backToPromotionList() {
      this.$router.push(`/management/promotion`);
    },
    onClickItem(id, url) {
      this.activeId = id;
      if (url != '') {
        this.$router.push(url);
      }
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
    },
  },
  mounted() {
    UploadService.getFiles().then((response) => {
      this.imageInfos= response.data;
    });
  },
  components: {
    SectionHeader,
    NavItem,
    FoodCard,
  },
};
</script>

<style lang="scss">
.input-create-menu[type=text]{
  width: 90%;
  border: 2px solid;
  border-color: var(--md-sys-color-primary-container);
  border-radius: 10px;
  background-color: var(--md-sys-color-surface);
  margin: 10px 0px 15px 10px;
  resize: none;
}
.textarea-create-menu {
  width: 90%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-color: var(--md-sys-color-primary-container);
  border-radius: 10px;
  background-color: var(--md-sys-color-surface);
  margin: 10px 0px 15px 10px;
  resize: none;
}
.button-create-promotion{
  background-color: var(--md-sys-color-tertiary-container);
  border: none;
  color: var(--md-sys-color-on-tertiary-container);
  text-decoration: none;
  padding: 16px 32px;
  margin: 4px 2px;
  border-radius: 10px;
  cursor: pointer;
}
.button-upload-file{
  background-color: var(--md-sys-color-primary-container);
  border: none;
  color: var(--md-sys-color-on-primary-container);
  text-decoration: none;
  padding: 10px 20px;
  margin: 4px 2px;
  border-radius: 10px;
  cursor: pointer;
}
.main-content-create-management{
  display: flex;
  flex-direction: row;
}

@media screen and (max-width: 768px) {
  .main-content-create-management{
    display: flex;
    flex-direction: column;
  }
  .button-create-promotion{
    background-color: var(--md-sys-color-tertiary-container);
    border: none;
    color: var(--md-sys-color-on-tertiary-container);
    text-decoration: none;
    padding: 10px 20px;
    margin: 4px 2px;
    border-radius: 10px;
    cursor: pointer;
  }
  .button-upload-file{
    background-color: var(--md-sys-color-primary-container);
    border: none;
    color: var(--md-sys-color-on-primary-container);
    text-decoration: none;
    padding: 6px 12px;
    margin: 4px 2px;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
