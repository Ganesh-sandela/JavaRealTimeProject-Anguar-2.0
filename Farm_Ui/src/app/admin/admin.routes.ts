import { Router, Routes } from "@angular/router";
import { AdminLayoutcompo } from "./admin-layoutcompo/admin-layoutcompo";
import { roleGuard } from "../role-guard";
import { AdminDashboard } from "./admin-dashboard/admin-dashboard";
import { AdminUserManagment } from "./admin-user-managment/admin-user-managment";
import { AdminProductManagemnet } from "./admin-product-managemnet/admin-product-managemnet";
import { AdminOrderManagement } from "./admin-order-management/admin-order-management";
import { AdminCategoryManagement } from "./admin-category-management/admin-category-management";

export const Admin_Routes: Routes = [

  {
    path: '',
    component: AdminLayoutcompo,
    canActivate: [roleGuard],
    data: { role: 'admin' },
    children: [
      // { path: '',redirectTo: 'admindashboard', pathMatch: 'full'  },
      { path: 'admindashboard', component: AdminDashboard },
      { path: 'adminusermngmt', component: AdminUserManagment },
      { path: 'adminproductmngmt', component: AdminProductManagemnet },
      { path: 'adminordermngmt', component: AdminOrderManagement },
      { path: 'admincategorymngmt', component: AdminCategoryManagement }
    ]
  }
]