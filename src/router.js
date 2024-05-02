import HomePage from "./components/HomePage.vue";
import SignUp from "./components/SignUp.vue";
import LoginPage from "./components/LoginPage.vue";
import StandardLayout from "./layouts/StandardLayout.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/home",
        component: HomePage,
    },
    {
        path: "",
        component: StandardLayout,
        children : [
            {
                path: "/signup",
                component: SignUp,
            },
            {
                path: "/login",
                component: LoginPage,
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;