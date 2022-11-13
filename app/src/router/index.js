import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ServeView from "../views/OrderToServe/OrderToServeView.vue";
import HistoryView from "@/views/OrderHistory/OrderHistoryView.vue";
import OrderView from "@/views/OrderDetail/OrderDetailView.vue";
import NewCustomerView from "../views/OrderQrCode/NewCustomerView.vue";
import OrderQrCodeView from "@/views/OrderQrCode/OrderQrCodeView.vue";
import MenuList from "@/views/CreateMenu/MenuList.vue";
import CreateMenu from "@/views/CreateMenu/CreateMenu.vue";
import PromotionList from "@/views/CreatePromotion/PromotionList.vue";
import CreatePromotion from "@/views/CreatePromotion/CreatePromotion.vue";
import Dashboard from "@/views/Dashboard/Dashboard.vue";
import LogoutView from "../views/LogoutView.vue";
import OrderCooking from "@/views/OrderCooking/OrderCookingView.vue";
import OrderToDoList from "@/views/OrderToDoList/OrderToDoListView.vue";
import AllMenu from "@/views/Menu/AllMenuView.vue";
import DetailMenu from "@/views/Menu/DetailMenuView.vue";
import CreateEmployeeAccount from "@/views/CreateEmployeeAccount/CreateEmployeeAccount.vue";
import EmployeeAccountList from "@/views/CreateEmployeeAccount/EmployeeAccountList.vue";
import { authAPI } from "../services/api";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: AllMenu,
    },
    {
      path: "/employee/order/serve",
      name: "serve-order",
      component: ServeView,
    },
    {
      path: "/order/history",
      name: "order-history-list",
      component: HistoryView,
    },
    {
      path: "/order/detail",
      name: "order-detail",
      component: OrderView,
    },
    {
      path: "/employee/new-customer",
      name: "new-customer",
      component: NewCustomerView,
    },
    {
      path: "/employee/new-customer/order-qrcode",
      name: "order-qrcode",
      component: OrderQrCodeView,
    },
    {
      path: "/reviews",
      name: "reviews",
      component: () => import("@/views/reviews/CreateReviewView.vue"),
    },
    {
      path: "/reviews/thank-you",
      name: "ThankYou",
      component: () => import("@/views/reviews/ThankYou.vue"),
    },
    {
      path: "/menu/all-promotion",
      name: "AllPromotion",
      component: () => import("@/views/AllPromotionView.vue"),
    },
    {
      path: "/employee/payment/create-promptpay",
      name: "promptPay.create",
      component: () => import("@/views/Payment/CreatePromptpayView.vue"),
    },
    {
      path: "/employee/payment/bill",
      name: "bill",
      component: () => import("@/views/Payment/BillView.vue"),
    },
    {
      path: "/management/menu",
      name: "MenuList",
      component: MenuList,
    },
    {
      path: "/management/menu/create-menu",
      name: "CreateMenu",
      component: CreateMenu,
    },
    {
      path: "/management/promotion",
      name: "PromotionList",
      component: PromotionList,
    },
    {
      path: "/management/promotion/create-promotion",
      name: "CreatePromotion",
      component: CreatePromotion,
    },
    {
      path: "/management/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/management/create/manager-account",
      name: "create-manager-account",
      component: () => import("@/views/Register/RegisterForManagerView.vue"),
    },
    {
      path: "/management/account/create-employee-account",
      name: "create-employee-account",
      component: CreateEmployeeAccount,
    },
    {
      path: "/management/account/employee-account-list",
      name: "employee-account-list",
      component: EmployeeAccountList,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/logout",
      name: "Logout",
      component: LogoutView,
    },
    {
      path: "/employee/order/order-to-do/order-cooking/:orderDescriptionId",
      name: "Order-cooking",
      component: OrderCooking,
    },
    {
      path: "/employee/order/order-to-do",
      name: "Order-to-cook",
      component: OrderToDoList,
    },
    {
      path: "/menu/detail/:foodId",
      name: "detail-menu",
      component: DetailMenu,
    },
  ],
});

router.beforeEach((to, from) => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken && to.name !== 'Login') {
    return {name: 'Login'};
  }

  if (accessToken && to.name === 'Login') {
    return {name: 'Home'};
  }
});

export default router;
