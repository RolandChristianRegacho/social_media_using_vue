<template>
    <div class="login_form">
        <br>
        <h1>
            Welcome to login page!
        </h1>
        <br>
        <br>
        <br>
        <div>
            <form @submit.prevent="submit">
                <input type="text" v-model="user.username" placeholder="Username">
                <input type="password" v-model="user.password" placeholder="Password">
                <button @click="login()">Login
                    <CaLogin class="icon" />
                </button>
            </form>
            <br>
            <router-link to="/signup">Don't have an account?</router-link>
        </div>
    </div>
</template>

<script>
import { CaLogin } from "@kalimahapps/vue-icons";
import { postAxiosData } from "@/additional_scripts/fetch-script";

export default {
    name: "LoginForm",
    components: {
        CaLogin
    },
    data() {
        return {
            user: {
                username: "",
                password: ""
            }
        }
    },
    mounted() {
        let user = this.getCookie("user")

        if (user) {
            this.$router.push({ name: "HomePage" });
        }
    },
    methods: {
        async login() {
            let data = {
                username: this.user.username,
                password: this.user.password
            }

            postAxiosData(`${this.BASE_URL}/login/auth.php`, data)
            .then(result => {
                if (result.type == "success") {
                    this.setCookie("user", JSON.stringify(result.data), 5)
                    this.$swal({
                        icon: result.type,
                        title: "Login Success!",
                    })
                    this.$swal.showLoading()
                    setTimeout(() => {
                        this.$router.push({ name: "HomePage" });
                        this.$swal.close()
                    }, 1000)
                }
                else {
                    this.$swal({
                        icon: result.type,
                        title: "Login Failed!",
                        text: result.message,
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.login_form {
    width: 500px;
    height: 400px;
    margin: auto;
    background: rgb(200, 200, 200) !important;
    color: rgb(52, 73, 94);
    border-radius: 5px;
}

.icon {
    color: white;
    font-size: 2em;
    vertical-align: middle;
}

a {
    color: rgb(52, 73, 94);
}
</style>@/additional_scripts/fetch-script