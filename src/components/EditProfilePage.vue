<template>
    <div @click="hideZoom($event)" id="grayBgDiv">
        <div class="editProfileDiv">
            <br>
            <br>
            <h1>Profile Information</h1>
            <br>
            <form @submit.prevent="submit">
                <img v-bind:src="user_info.profile_picture" width="200" height="200" />
                <input type="file" />
                <input type="text" placeholder="First Name" v-model="user_info.first_name" />
                <input type="text" placeholder="Middle Name" v-model="user_info.middle_name" />
                <input type="text" placeholder="Last Name" v-model="user_info.last_name" />
                <button @click="updateInformation()">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import { getAxiosData } from '@/additional_scripts/fetch-script';
import $ from 'jquery';
    export default {
        name: "EditProfilePage",
        data() {
            return {
                user_info: {
                    id: "",
                    profile_picture: "",
                    first_name: "",
                    middle_name: "",
                    last_name: ""
                }
            }
        },
        methods: {
            hideZoom(event) {
                if(event.target.nodeName != "BUTTON") {
                    $("#grayBgDiv").hide()
                }
            },
            updateInformation() {
                console.log(this.user_info)
            }
        },
        async mounted() {
            let user = this.getCookie("user")

            if (user == "") {
                logout()
            }

            let profile_id = this.$router.currentRoute._value.params.id.split("=")[1]

            getAxiosData(`${this.BASE_URL}/home/users.php?profile_id=${profile_id}`)
                .then(result => {
                    this.user_info = result.data
                })
        }
    }

function logout() {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.$swal({
        title: "Logging out",
    })
    this.$swal.showLoading()
    setTimeout(() => {
        this.$router.push({ name: "LoginPage" })
        this.$swal.close()
    }, 1000)
}
</script>

<style scoped>
    #grayBgDiv {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(50, 50, 50, 0.8);
        display: none;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: rgba(38, 71, 78, 1);
    }

    .editProfileDiv {
        width: 400px;
        height: 700px;
        background: rgba(200, 200, 200, 1);
    }
</style>