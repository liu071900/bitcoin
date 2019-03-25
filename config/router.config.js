export default [
  // user
  {
    path: '/user',
    component: '../layouts/IndexLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  //首页
  {
    path: '/index',
    component: '../layouts/IndexLayout',
    routes: [
      { 
        path: '/index',
        name:'index',
        component: './IndexPage/IndexPage' 
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BaseLayout',
    authority: ['admin', 'user'],
    routes: [
      //
      {
        path: '/market',
        name: 'market',
        component: './Market/Market',
      },
      
      {
        component: '404',
      },
    ],
  },
];
