<template> 
    <div class="container">
        <header>
            <img src="../assets/rest-logo.png">
            <nav>
                <ul>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Add restaurant</a>
                    </li>
                    <li>
                        <a href="#">Update restaurant</a>
                    </li>
                    <li>
                        <a href="#" @click="handleLogout">Logout</a>
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