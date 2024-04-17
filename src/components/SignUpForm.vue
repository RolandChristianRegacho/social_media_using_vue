<template>
    <div class="signup_form">
        <br>
        <h1 class="secondary_color">
            Welcome to Signup page!
        </h1>
        <br>
        <br>
        <br>
        <div>
            <form @submit.prevent="submit">
                <input type="email" id="signup_uname" v-model="user.username" placeholder="Username">
                <input type="password" id="signup_pword" v-model="user.password" placeholder="Password" minlength="10">
                <input type="password" id="signup_cword" v-model="user.confirm" placeholder="Confirm Password" minlength="10">
                <input type="text" id="signup_fname" v-model="user.first_name" placeholder="First Name">
                <input type="text" v-model="user.middle_name" placeholder="Middle Name">
                <input type="text" id="signup_lname" v-model="user.last_name" placeholder="Last Name">
                <input type="date" id="signup_bdate" v-model="user.birthday">
                <button class="main_bg_wHover main_color main_border" @click="signup()">Sign up</button>
            </form>
            <br>
            <router-link class="secondary_color" to="/login">Have an account?</router-link>
        </div>
    </div>
</template>

<script>
import { postAxiosData } from "@/additional_scripts/fetch-script";
import form_check, { date_setter } from "@/additional_scripts/form-checker";
import $ from "jquery"

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
        let signup_bdate = document.getElementById("signup_bdate")
        signup_bdate.max = date_setter()
    },
    methods: {
        async signup() {
            if(this.user.password == this.user.confirm) {
                let data = {
                    "email": this.user.username,
                    "password": this.user.password,
                    "confirm": this.user.confirm,
                    "first_name": this.user.first_name,
                    "middle_name": this.user.middle_name,
                    "last_name": this.user.last_name,
                    "birthday": this.user.birthday
                }

                let form_result = form_check(data)

                if(form_result.type == "fail") {
                    switch(form_result.data.form) {
                        case "email": {
                            $("#signup_uname").focus()
                            $("#signup_uname").attr("class", "input-checker-fail")
                            break
                        }
                        case "password": {
                            $("#signup_pword").focus()
                            $("#signup_pword").attr("class", "input-checker-fail")
                            break
                        }
                        case "first_name": {
                            $("#signup_fname").focus()
                            $("#signup_fname").attr("class", "input-checker-fail")
                            break
                        }
                        case "last_name": {
                            $("#signup_lname").focus()
                            $("#signup_lname").attr("class", "input-checker-fail")
                            break
                        }
                    }
                    return 
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
            else {
                this.$swal("Password should be the same!", "", "error")
            }
        }
    }
}
</script>

<style scoped>
.signup_form {
    width: 500px;
    height: 750px;
    margin: auto;
    background: rgb(200, 200, 200) !important;
    color: rgb(52, 73, 94);
    border-radius: 5px;
}
</style>@/additional_scripts/fetch-script