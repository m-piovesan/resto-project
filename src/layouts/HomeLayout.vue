<template>
    <myHeader />
    <div class="home-content">
        <router-view />
    </div>
</template>

<script>
    import myHeader from '../components/Header-.vue';
    import './HomePage.scss'

    export default {
        name: 'HomeLayout',
        components: {
            myHeader,
        },
        data() {
            return {
                user: JSON.parse(localStorage.getItem('user-info'))
            }
        },
        mounted() {
            if (!localStorage.getItem('user-info')) {
                this.$router.push('/signup');
            }
        }
    }
</script>