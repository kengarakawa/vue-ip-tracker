import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import './style.css'
import App from './App.vue'
import routes from './router'


const router = createRouter({
    history: createWebHistory(),    
    routes: routes,
});


router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    document.title = `${to.meta.title}`
    next()
})



createApp(App).use(router).mount('#app')
