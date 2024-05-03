<template> 
    <div class="container">
        <header>
            <img src="../assets/rest-logo.png">
            
            <nav>
                <ul>
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link to="add">Add restaurant</router-link>
                    </li>
                    <li>
                        <router-link to="update">Update restaurant</router-link>
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
        methods: {
            handleLogout() {
                localStorage.removeItem('user-info');
                
                this.$router.push('/login');
            }
        }
    }
</script>