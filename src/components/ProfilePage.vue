<template>
    <div class="banner"></div>
    <div class="profile_pic_profile main_bg">
        <div class="profile_pic_profile_img" v-if="user_info.profile_picture != null"
                    :style="{ backgroundImage: 'url(\'' + user_info.profile_picture + '\')', backgroundPosition: 'center center', backgroundSize: '100%, 100%', backgroundRepeat: 'no-repeat' }">
        </div>
        <div class="profile_pic_profile_img_default" v-else></div>
    </div>
    <div class="profile_information_div border_bottom_only">
        <div class="profile_information_div_name">
            <h1 class="main_color">{{ this.user_info.first_name }} {{ this.user_info.middle_name }} {{ this.user_info.last_name }}</h1>
            <h2 class="main_color">{{ this.user_info.first_name }} {{ this.user_info.middle_name }} {{ this.user_info.last_name }}</h2>
        </div>
        <button v-if="owner_id == user_info.id" @click="showEditInfo()" class="main_bg_wHover main_color main_border">Edit</button>
    </div>
</template>

<script>
import { getCookie } from "@/additional_scripts/cookie-handler";
import { getAxiosData } from "@/additional_scripts/fetch-script"
import logout from "@/additional_scripts/logout";
import $ from 'jquery';

export default {
    name: "ProfilePage",
    data() {
        return {
            owner_id: "",
            user_info: {
                id: "",
                profile_picture: "",
                first_name: "",
                middle_name: "",
                last_name: ""
            }
        }
    },
    async mounted() {
        let user = getCookie("user")

        if (user == "") {
            logout(this.$swal)
        }
        this.owner_id = JSON.parse(user).id
        let profile_id = this.$router.currentRoute._value.params.id.split("=")[1]

        getAxiosData(`${this.BASE_URL}/home/users.php?profile_id=${profile_id}`)
            .then(result => {
                this.user_info = result.data
            })

        this.emitter.on("onEditProfile", () => {
            getAxiosData(`${this.BASE_URL}/home/users.php?profile_id=${profile_id}`)
                .then(result => {
                    this.user_info = result.data
                })
        })
    },
    methods: {
        showEditInfo() {
            $("#grayBgDiv").attr("style", "display: flex;")
        }
    }
}
</script>

<style scoped>
.banner {
    float: left;
    width: 100%;
    height: 200px;
    background: url("../assets/bg.webp");
    background-size: 100% 100%;
    z-index: -2;
    position: relative;
}

.profile_pic_profile {
    position: relative;
    width: 200px;
    height: 200px;
    z-index: -1;
    margin-top: 95px;
    margin-left: 50px;
}

.profile_pic_profile_img {
    float: left;
    width: 100%;
    height: 100%;
    position: absolute;
}

.profile_pic_profile_img_default {
    float: left;
    width: 100%;
    height: 100%;
    background: url("../assets/image.png");
    background-size: 100% 100%;
    box-shadow: 3px 0px 5px 3px rgba(20, 20, 20, 1);
    position: absolute;
}

.profile_information_div button {
    float: right;
    margin-right: 20px;
    max-width: 80%;
    margin-top: 20px;
}

.profile_information_div {
    float: left;
    width: 100%;
    height: 80px;
}

.profile_information_div_name {
    float: left;
    width: auto;
    height: 60px;
    margin-left: 300px;
    margin-top: 20px;
}

.profile_information_div h1 {
    float: left;
    text-align: left;
}

.profile_information_div h2 {
    display: none;
}

@media only screen and (orientation: portrait) {
    .banner {
        height: 150px;
    }

    .profile_pic_profile {
        width: 100px;
        height: 100px;
        margin-top: 95px;
        margin-left: 20px;
    }

    .profile_information_div {
        height: 130px;
    }

    .profile_information_div button {
        margin-right: 10%;
        margin-top: 0;
    }

    .profile_information_div h1 {
        display: none;
    }

    .profile_information_div h2 {
        text-align: center;
        display: block;
        margin: 0;
    }

    .profile_information_div_name {
        margin: 0;
        margin-top: 20px;
        width: 100%;
        text-align: center;
        text-overflow: ellipsis;
    }
}
</style>