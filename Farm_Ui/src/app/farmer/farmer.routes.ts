import { Routes } from "@angular/router";
import { FarmerLayoutcompo } from "./farmer-layoutcompo/farmer-layoutcompo";
import { roleGuard } from "../role-guard";
import { FarmerDashboard } from "./farmer-dashboard/farmer-dashboard";
import { Farmeraddproducts } from "./farmeraddproducts/farmeraddproducts";
import { FarmerOrders } from "./farmer-orders/farmer-orders";
import { FarmerProfile } from "./farmer-profile/farmer-profile";
import { FarmerSetting } from "./farmer-setting/farmer-setting";
import { FarmerLogout } from "./farmer-logout/farmer-logout";
import { FarmerNotifications } from "./farmer-notifications/farmer-notifications";
import { FarmerMyproducts } from "./farmer-myproducts/farmer-myproducts";

export const Farmer_Routes: Routes = [
  {
    path: '',
    component: FarmerLayoutcompo,
    data: { role: 'farmer' },
    canActivate: [roleGuard],
    children: [
      { path: '', redirectTo: 'farmerdashboard', pathMatch: 'full' },
      { path: 'farmerdashboard', component: FarmerDashboard },
      { path: 'farmeraddproducts', component: Farmeraddproducts },
      { path:'farmermyproducts',component:FarmerMyproducts},
      { path: 'farmerorders', component: FarmerOrders },
      { path: 'farmerprofile', component: FarmerProfile },
      { path: 'farmernotification', component: FarmerNotifications },
      { path: 'farmersetting', component: FarmerSetting },
      { path: 'farmerlogout', component: FarmerLogout }
    ]
  }
]