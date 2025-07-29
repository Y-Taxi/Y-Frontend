import { createRouter, createWebHistory } from "vue-router";

import HomeView from '../view/HomeView.vue'
import LoginView from '../view/LoginView.vue'
import UserJoinView from '../view/UserJoinView.vue'

const router = createRouter({  
  history: createWebHistory(""),  
  routes: [    
    {      
      path: "/",     
      name: "main",     
      component: HomeView,    
    },    
    {      
      path: "/login",     
      name: "login",      
      component: LoginView,    
    },  
    {      
      path: "/userJoin",     
      name: "userJoin",      
      component: UserJoinView,    
    },  
  ],
});

export default router;