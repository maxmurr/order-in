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
        <div class="flex justify-between ">
        <h3 class="headline-large mb-10">เพิ่มรายการอาหาร</h3>
            <button
                class="w-8 h-8 secondary-container rounded-full p-1 justify-center"
                @click="backToMenuList()"
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
            <div >
              <label class="btn btn-default p-0">
                <input
                    type="file"
                    accept="image/*"
                    ref="file"
                    id="browse"
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
          <h3 class="body-large">ชื่ออาหาร</h3>
          <input type="text" class="input-create-menu" v-model="food.food_name">
          <h3 class="body-large">ราคา</h3>
          <input type="text" class="input-create-menu" v-model="food.food_price">
          <h3 class="body-large">คำอธิบายอาหาร</h3>
          <textarea class="textarea-create-menu" v-model="food.food_detail"></textarea>
          <h3 class="body-large">เวลาในการจัดทำอาหาร</h3>
          <input type="text" class="input-create-menu" v-model="food.cooking_time">
          <h3 class="body-large">ประเภทอาหาร</h3>
          <input type="text" class="input-create-menu" v-model="category_str">
          <h3 class="body-large">ข้อมูลสำหรับการแพ้อาหาร</h3>
          <textarea class="textarea-create-menu" v-model="allery_str"></textarea>

        </div>

      </div>
      <div class="grid justify-items-end mb-10">
        <button
            class="button-create-menu body-large"
            :disabled="!currentImage"
            @click="saveNewFood()"
        >
          เพิ่มรายการอาหาร
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
import { foodAPI } from '../../services/api.js';
import axios from "axios";
export default {
  /*To Do List
*
* - Data -
* ต้องมีการเก็บค่าข้อมูลลง Food
*
* - Method -
* saveNewFood()
* เป็นเมธอดที่ใช้กับ button ซึ่งพอกดแล้วจะต้องบันทึกข้อมูลที่กรอกมาไปเก็บไว้ที่ DB
* ทำการเซฟรูปภาพ (นี่ก้อปโค้ดเซฟรูปภาพในเน็ตมาแปะไว้ให้แล้วน่าจะใช้ได้เลย)
* และทำการลิ้งไปยังหน้ารายละเอียดอาการของข้อมูลที่เพิ่งกรอกเข้ามา
*
*
*
* */
  data() {
    return {
      category_str: '',
      allery_str: '',

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
        {label: 'รายการอาหาร', icon: 'restaurant_menu', router: '/management/menu',activeId: 1,},
        {label: 'โปรโมชัน', icon: 'grid_view', router: '/management/promotion',activeId: 0,},
        {label: 'ออกจากระบบ', icon: 'logout', router: '/logout', activeId:0}
      ],
      food: {
        food_name: null,
        food_price: null,
        food_detail: null,
        cooking_time: null,
        category_ids : null,
        food_allery_ids: null,
        image: null,
      },
    };
  },
  methods: {
    async saveNewFood() {
      try {
        this.food.category_ids = this.category_str.split(",");
        this.food.food_allery_ids = this.allery_str.split(",");

        const fd = new FormData();
        fd.append('food_name', this.food.food_name)
        fd.append('food_price', this.food.food_price)
        fd.append('food_detail', this.food.food_detail)
        fd.append('cooking_time', this.food.cooking_time)
        for (let i = 0; i < this.food.category_ids.length; i++){
          fd.append('category_ids[]', this.food.category_ids[i])
        }
        for (let i = 0; i < this.food.food_allery_ids.length; i++){
          fd.append('food_allery_ids[]', this.food.food_allery_ids[i])
        }
        fd.append('image', this.currentImage)

        this.error = null;
        const response = await foodAPI.saveNew(fd);
        this.$router.push(`/management/menu`);
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
    backToMenuList() {
      this.$router.push(`/management/menu`);
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
input-create-menu[type=text]{
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
.button-create-menu{
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
@media screen and (max-width: 768px) {

  .button-create-menu{
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
