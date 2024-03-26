<template>
    <div class="banner"></div>
    <div class="profile_pic_profile">
        <div class="profile_pic_profile_img" v-if="profile_picture != ''">
        </div>
        <div class="profile_pic_profile_img_default" v-else></div>
    </div>
    <div class="profile_information_div">
        <div class="profile_information_div_name">
            <h1>{{ this.user_info.first_name }} {{ this.user_info.middle_name }} {{ this.user_info.last_name }}</h1>
            <h3>{{ this.user_info.first_name }} {{ this.user_info.middle_name }} {{ this.user_info.last_name }}</h3>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "ProfilePage",
    data() {
        return {
            profile_picture: "",
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
            logout()
        }

        let profile_id = this.$router.currentRoute._value.params.id.split("=")[1]

        const result = await axios.get(`${this.BASE_URL}/home/users.php?profile_id=${profile_id}`)

        if (result.status == 200) {
            this.user_info = result.data.data
        }

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
.banner {
    float: left;
    width: 100%;
    height: 200px;
    background: url("../assets/bg.webp");
    background-size: 100% 100%;
}

.profile_pic_profile {
    position: absolute;
    width: 200px;
    height: 200px;
    background: white;
    z-index: 2;
    margin-top: 95px;
    margin-left: 50px;
}

.profile_pic_profile_img {
    float: left;
    width: 100%;
    height: 100%;
}

.profile_pic_profile_img_default {
    float: left;
    width: 100%;
    height: 100%;
    background: url("../assets/image.png");
    background-size: 100% 100%;
    box-shadow: 3px 0px 5px 3px rgba(20, 20, 20, 1);
}

.profile_information_div {
    float: left;
    width: 100%;
    height: 100px;
    border-bottom: 2px solid white;
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

.profile_information_div h3 {
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

    .profile_information_div h1 {
        display: none;
    }

    .profile_information_div h3 {
        text-align: center;
        display: block;
        margin: 0;
    }

    .profile_information_div_name {
        margin: 0;
        margin-top: 80px;
        width: 100%;
        text-align: center;
    }
}
</style>