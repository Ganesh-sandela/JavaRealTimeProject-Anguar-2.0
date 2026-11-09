import { Routes } from "@angular/router";
import { Login } from "./login/login";
import { About } from "./publicpage/about/about";
import { Contact } from "./publicpage/contact/contact";
import { Home } from "./publicpage/home/home";
import { Maincompo } from "./publicpage/maincompo/maincompo";
import { Shop } from "./publicpage/shop/shop";
import { Register } from "./register/register";
import { UserLayoutcompo } from "./user/user-layoutcompo/user-layoutcompo";
import { Userhome } from "./user/userhome/userhome";
import { Categories } from "./user/sidebar-pages/categories/categories";
import { Offers } from "./user/sidebar-pages/offers/offers";
import { Farmers } from "./user/sidebar-pages/farmers/farmers";
import { Orders } from "./user/sidebar-pages/orders/orders";
import { FarmerLayoutcompo } from "./farmer/farmer-layoutcompo/farmer-layoutcompo";
import { FarmerDashboard } from "./farmer/farmer-dashboard/farmer-dashboard";
import { Farmeraddproducts } from "./farmer/farmeraddproducts/farmeraddproducts";
import { FarmerOrders } from "./farmer/farmer-orders/farmer-orders";
import { FarmerProfile } from "./farmer/farmer-profile/farmer-profile";
import { FarmerSetting } from "./farmer/farmer-setting/farmer-setting";
import { FarmerLogout } from "./farmer/farmer-logout/farmer-logout";
import { roleGuard } from "./role-guard";
import { AdminLayoutcompo } from "./admin/admin-layoutcompo/admin-layoutcompo";
import { AdminUserManagment } from "./admin/admin-user-managment/admin-user-managment";
import { AdminProductManagemnet } from "./admin/admin-product-managemnet/admin-product-managemnet";
import { AdminOrderManagement } from "./admin/admin-order-management/admin-order-management";
import { AdminCategoryManagement } from "./admin/admin-category-management/admin-category-management";
import { guestGuard } from "./guest-guard";
import { OauthSuccess } from "./oauth-success/oauth-success";
import { Reset } from "./reset/reset";
import { AdminDashboard } from "./admin/admin-dashboard/admin-dashboard";
import { Feedback } from "./user/feedback/feedback";

export const routes: Routes = [

  {
    path:'oauth-success',
    component:OauthSuccess
},

  // Public Layout
  {
    path: '',
    component: Maincompo,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'shop', component: Shop },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      {path:'reset',component:Reset},
      { path: 'login', component: Login, canActivate:[guestGuard] },
      { path: 'register', component: Register,canActivate:[guestGuard] }
    ]
  },

  // User Layout
  {
    path: 'user',
    loadChildren:()=>import('./user/user.routes').then(m=>m.User_Routes)
    // component: UserLayoutcompo,
    // data: { role: 'customer' },
    // canActivate: [roleGuard],
    // children: [
    //   { path: '', redirectTo: 'userhome', pathMatch: 'full' },
    //   { path: 'userhome', component: Userhome },
    //   { path: 'usercategories', component: Categories },
    //   { path: 'useroffers', component: Offers },
    //   { path: 'userfarmers', component: Farmers },
    //   { path: 'userorders', component: Orders }
    // ]
  },

  {
    path: 'farmer',
    loadChildren:()=>import('./farmer/farmer.routes').then(m=>m.Farmer_Routes)

    // component: FarmerLayoutcompo,
    // data: { role: 'farmer' },
    // canActivate: [roleGuard],
    // children: [
    //   { path: 'farmerdashboard', component: FarmerDashboard },
    //   { path: 'farmeraddproducts', component: Farmeraddproducts },
    //   { path: 'farmerorders', component: FarmerOrders },
    //   { path: 'farmerprofile', component: FarmerProfile },
    //   { path: 'farmernotification', component: Notification },
    //   { path: 'farmersetting', component: FarmerSetting },
    //   { path: 'farmerlogout', component: FarmerLogout }
    // ]
  },

  {
    path: 'admin',
    loadChildren:()=>import('./admin/admin.routes').then(m=>m.Admin_Routes)
    // data: { role: 'admin' },
    // component: AdminLayoutcompo,
    // canActivate: [roleGuard],
    // children: [
    //   { path: 'admindashboard', component: AdminDashboard },
    //   { path: 'adminusermngmt', component: AdminUserManagment },
    //   { path: 'adminproductmngmt', component: AdminProductManagemnet },
    //   { path: 'adminordermngmt', component: AdminOrderManagement },
    //   { path: 'admincategorymngmt', component: AdminCategoryManagement },

    // ]
  },





];