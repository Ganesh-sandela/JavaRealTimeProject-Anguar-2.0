export class CustomNavigateRoutes {

  static customerMenu = [
    {
      title: 'Home',
      route: '/user/userhome',
      i: 'fa-solid fa-house'
    },
    {
      title: 'Categories',
      route: '/user/usercategories',
      i: 'fa-solid fa-layer-group'
    },
    {
      title: 'Orders',
      route: '/user/userorders',
      i: 'fa-solid fa-cart-shopping'
    },
    {
      title: 'Offers',
      route: '/user/useroffers',
      i: 'fa-solid fa-tags'
    },
    {
      title: 'Farmers',
      route: '/user/userfarmers',
      i: 'fa-solid fa-tractor'
    }
  ];


  static farmerMenu = [
    {
      title: 'Dashboard',
      route: '/farmer/farmerdashboard',
      i: 'fa-solid fa-gauge-high'
    },
    {
      title: 'My Products',
      route: '/farmer/farmermyproducts',
      i: 'fa-solid fa-boxes-stacked'
    },
    {
      title: 'Add Products',
      route: '/farmer/farmeraddproducts',
      i: 'fa-solid fa-square-plus'
    },
    {
      title: 'Orders',
      route: '/farmer/farmerorders',
      i: 'fa-solid fa-cart-shopping'
    },
    {
      title: 'Settings',
      route: '/farmer/farmersetting',
      i: 'fa-solid fa-gear'
    },
    {
      title: 'Profile',
      route: '/farmer/farmerprofile',
      i: 'fa-solid fa-user'
    },
    {
      title: 'Notifications',
      route: '/farmer/farmernotification',
      i: 'fa-solid fa-bell'
    },
    {
      title: 'Logout',
      route: '/farmer/farmerlogout',
      i: 'fa-solid fa-right-from-bracket'
    }
  ];


  static adminMenu = [
    {
      title: 'Dashboard',
      route: '/admin/admindashboard',
      i: 'fa-solid fa-gauge-high'
    },
    {
      title: 'Users',
      route: '/admin/adminusermngmt',
      i: 'fa-solid fa-users'
    },
    {
      title: 'Products',
      route: '/admin/adminproductmngmt',
      i: 'fa-solid fa-boxes-stacked'
    },
    {
      title: 'Orders',
      route: '/admin/adminordermngmt',
      i: 'fa-solid fa-cart-shopping'
    },
    {
      title: 'Categories',
      route: '/admin/admincategorymngmt',
      i: 'fa-solid fa-layer-group'
    }
  ];

}