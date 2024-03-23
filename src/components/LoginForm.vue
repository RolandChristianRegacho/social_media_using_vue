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
import axios from "axios"
import { CaLogin } from "@kalimahapps/vue-icons";

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
        let user = getCookie("user")

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

            const result = await axios.post(`${this.BASE_URL}/login/auth.php`, data)

            if (result.status == 200) {
                if (result.data.type == "success") {
                    setCookie("user", JSON.stringify(result.data.data), 5)
                    this.$swal({
                        icon: result.data.type,
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
                        icon: result.data.type,
                        title: "Login Failed!",
                        text: result.data.message,
                    })
                }
            }
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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
</style>