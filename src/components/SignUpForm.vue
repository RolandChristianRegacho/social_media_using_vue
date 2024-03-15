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
                <input type="text" v-model="user.first_name" placeholder="First Name">
                <input type="text" v-model="user.middle_name" placeholder="Middle Name">
                <input type="text" v-model="user.last_name" placeholder="Last Name">
                <input type="date" v-model="user.birthday">
                <button @click="signup()">Sign up</button>
            </form>
            <br>
            <router-link to="/login">Have an account?</router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import swal from 'sweetalert';

export default {
    name: "LoginForm",
    data() {
        return {
            user: {
                username: "",
                password: "",
                first_name: "",
                middle_name: "",
                last_name: "",
                birthday: ""
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
        async signup() {
            let data = {
                "email": this.user.username,
                "password": this.user.password,
                "first_name": this.user.first_name,
                "middle_name": this.user.middle_name,
                "last_name": this.user.last_name,
                "birthday": this.user.birthday
            }

            const result = await axios.post(`http://localhost:3000/user`, data)

            if (result.status == 201) {
                swal("Sign up Successful!", "You may now log in", "success")
                .then(() => {
                    this.$router.push({ name: "LoginPage" });
                });
            }
        }
    }
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
@media (prefers-color-scheme: dark) {
    .login_form {
        width: 500px;
        height: 400px;
        margin: auto;
        background: rgb(200, 200, 200) !important;
        color: rgb(52, 73, 94);
    }
}
a {
    color: white;
}
</style>