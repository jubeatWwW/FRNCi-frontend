import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/components/Main/Main';
import Home from '@/components/Home/Main';
import Profile from '@/components/Profile/Main';
import Usage from '@/components/Usage/Main';
import Policy from '@/components/Policy/Main';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import 'font-awesome/css/font-awesome.css';

Vue.use(VueMaterial);
Vue.use(Router);


Vue.material.registerTheme({
    black: {
        primary: 'black',
    },
    orange: {
        primary: 'orange',
    },
});

export default new Router({
    routes: [
        {
            path: '/',
            component: Main,
            children: [
                {
                    path: '',
                    component: Home,
                    name: 'home',
                },
                {
                    path: 'profile/:id',
                    component: Profile,
                    name: 'profile',
                },
                {
                    path: 'login',
                    component: Usage,
                    name: 'login',
                },
                {
                    path: 'register',
                    component: Usage,
                    name: 'register',
                },
                {
                    path: 'termsofservice',
                    component: Policy,
                    name: 'Terms of Service',
                },
                {
                    path: 'privacypolicy',
                    component: Policy,
                    name: 'Privacy Policy',
                },
            ],
        },
    ],
});
