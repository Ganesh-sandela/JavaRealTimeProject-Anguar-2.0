import { Routes } from "@angular/router";
import { UserLayoutcompo } from "./user-layoutcompo/user-layoutcompo";
import { roleGuard } from "../role-guard";
import { Userhome } from "./userhome/userhome";
import { Categories } from "./sidebar-pages/categories/categories";
import { Offers } from "./sidebar-pages/offers/offers";
import { Farmers } from "./sidebar-pages/farmers/farmers";
import { Orders } from "./sidebar-pages/orders/orders";
import { Vegetables } from "./vegetables/vegetables";
import { Fruits } from "./fruits/fruits";
import { Dairy } from "./dairy/dairy";
import { Grains } from "./grains/grains";
import { Organic } from "./organic/organic";
import { Flowers } from "./flowers/flowers";
import { Seeds } from "./seeds/seeds";
import { Myorders } from "./myorders/myorders";
import { Whitelist } from "./whitelist/whitelist";
import { Myprofile } from "./myprofile/myprofile";
import { Addresses } from "./addresses/addresses";
import { Notifications } from "./notifications/notifications";
import { Helpsupport } from "./helpsupport/helpsupport";
import { UserLogout } from "./user-logout/user-logout";
import { AddAddress } from "./add-address/add-address";
import { Feedback } from "./feedback/feedback";
import { Cart } from "./cart/cart";
import { Checkout } from "./checkout/checkout";
import { Productinfo } from "./productinfo/productinfo";


export const User_Routes: Routes = [
  {
    path: '',
    component: UserLayoutcompo,
    data: { role: 'customer' },
    canActivate: [roleGuard],
    children: [
      { path: '', redirectTo: 'userhome', pathMatch: 'full' },
      { path: 'userhome', component: Userhome },
      { path: 'usercategories', component: Categories },
      { path: 'useroffers', component: Offers },
      { path: 'userfarmers', component: Farmers },
      { path: 'userorders', component: Orders },
      {path:'useraddaddress',component:AddAddress},
      {path:'feedback',component:Feedback},
      {path:'cart',component:Cart},
     { path: 'uservegetables/:id', component: Vegetables },
      { path:'userfruits/:id',component:Fruits},
      { path: 'userdairy/:id',component:Dairy},
      {path: 'usergrains/:id',component:Grains},
      { path: 'userorganic/:id',component:Organic},
      { path:'userflowers/:id',component:Flowers},
      {path :'userseeds/:id', component:Seeds},
      {path:'useroffers/:id',component:Offers},
      {path:'checkout',component:Checkout},
      {path:'productInfo',component:Productinfo},


      //sidemenu
    
      {path:'shopByCategory', component:Vegetables},
      {path:'myorders', component:Myorders},
      {path:'whishlist', component:Whitelist},
      {path:'myprofile', component:Myprofile},
      {path:'addresses', component:Addresses},
      {path:'notifications', component:Notifications},
      {path:'helpsuport', component:Helpsupport},
      {path:'logout', component:UserLogout},
    ]
  },

]