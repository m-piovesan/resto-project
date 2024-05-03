import HomePage from "./pages/HomePage.vue";
import SignUp from "./pages/SignUp.vue";
import LoginPage from "./pages/LoginPage.vue";
import StandardLayout from "./layouts/StandardLayout.vue";
import HomeLayout from "./layouts/HomeLayout.vue";
import AddPage from "./pages/AddPage.vue";
import UpdatePageVue from "./pages/UpdatePage.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
    },
    {
        path: "/",
        component: HomeLayout,
        children : [
            {
                path: "home",
                component: HomePage,
            },
            {
                path: "add",
                component: AddPage,
            },
            {
                path: "update",
                component: UpdatePageVue,
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;