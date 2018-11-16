import Vue from 'vue';
import Router from 'vue-router';
import workSpace from '@/components/workSpace';
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'workSpace',
            component: workSpace
        }
    ]
});
