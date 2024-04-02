<template>
    <div class="signup_form">
        <br>
        <h1>
            Welcome to Signup page!
        </h1>
        <br>
        <br>
        <br>
        <div>
            <form @submit.prevent="submit">
                <input type="email" v-model="user.username" placeholder="Username">
                <input type="password" v-model="user.password" placeholder="Password" minlength="10">
                <input type="password" v-model="user.password" placeholder="Confirm Password" minlength="10">
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
import { postAxiosData } from "@/additional_scripts/fetch-script";
export default {
    name: "LoginForm",
    data() {
        return {
            user: {
                username: "",
                password: "",
                confirm: "",
                first_name: "",
                middle_name: "",
                last_name: "",
                birthday: ""
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
        async signup() {
            let data = {
                "email": this.user.username,
                "password": this.user.password,
                "confirm": this.user.confirm,
                "first_name": this.user.first_name,
                "middle_name": this.user.middle_name,
                "last_name": this.user.last_name,
                "birthday": this.user.birthday
            }

            postAxiosData(`${this.BASE_URL}/login/signup.php`, data)
            .then(result => {
                if(result.type == "success") {
                    this.$swal("Sign up Successful!", "You may now log in", "success")
                        .then(() => {
                            this.$router.push({ name: "LoginPage" });
                        });
                }
                else {
                    this.$swal("Sign up failed!", result.text, result.type)
                }
            })
        }
    }
}
</script>

<style scoped>
.signup_form {
    width: 500px;
    height: 700px;
    margin: auto;
    background: rgb(200, 200, 200) !important;
    color: rgb(52, 73, 94);
    border-radius: 5px;
}

a {
    color: rgb(52, 73, 94);
}
</style>@/additional_scripts/fetch-script