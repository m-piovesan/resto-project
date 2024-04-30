import HomePage from "./components/HomePage.vue";
import SignUp from "./components/SignUp.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "home",
        path: "/",
        component: HomePage,
    },
    {
        name: "signup",
        path: "/signup",
        component: SignUp,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;