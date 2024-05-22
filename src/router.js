import StandardLayout from "./layouts/StandardLayout.vue";
import HomeLayout from "./layouts/HomeLayout.vue";

import SignUp from "./pages/SignUp.vue";
import LoginPage from "./pages/LoginPage.vue";
import HomePage from "./pages/HomePage.vue";
import UpdatePage from "./pages/UpdatePage.vue";
import RestaurantsPage from './pages/RestaurantsList.vue';
import RestaurantPage from './pages/RestaurantPage.vue';

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "",
        component: StandardLayout,
        children: [
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
        children: [
            {
                path: "home",
                component: HomePage,
            },
            {
                path: "update",
                component: UpdatePage,
            },
            {
                path: "restaurants",
                component: RestaurantsPage,
            },
            {
                path: "restaurants/:id",
                component: RestaurantPage,
                name: "RestaurantPage"
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;