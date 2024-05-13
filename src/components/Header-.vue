<template> 
    <div class="container">
        <header>
            <img src="../assets/rest-logo.png">
            
            <nav>
                <ul>
                    <li>
                        <router-link :class="{ 'active': currentPage === '/home' }" to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link :class="{ 'active': currentPage === '/update' }" to="update">Update restaurant</router-link>
                    </li>
                    <li>
                        <router-link :class="{ 'active': currentPage === '/restaurant' }" to="restaurant">All restaurants</router-link>
                    </li>
                    <li>
                        <router-link to="/" @click="handleLogout">Logout</router-link>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
</template>

<script>
    import '../styles/Header-.scss'

    export default {
        name: 'myHeader',
        data() {
            return {
                currentPage: '',
            };
        },
        methods: {
            handleLogout() {
                localStorage.removeItem('user-info');
                
                this.$router.push('/login');
            }
        },
        mounted() {
            this.currentPage = this.$route.path;
        },
        watch: {
            '$route'() {
                this.currentPage = this.$route.path;
            }
        }
    }
</script>