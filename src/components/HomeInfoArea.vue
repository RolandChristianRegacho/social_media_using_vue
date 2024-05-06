<template>
    <div class="home_info_area">
        <div class="profile-picture border_bottom_only">
            <img v-bind:src="user.profile_picture" class="main_bg" />
        </div>
        
        <div class="profile-details">
            <button class="main_color">{{ displayName() }}</button>
            <button class="main_color">{{ displayBirthday() }}</button>
        </div>
    </div>
</template>

<script>
import { getCookie } from '@/additional_scripts/cookie-handler'
import { getAxiosData } from '@/additional_scripts/fetch-script'
import logout from '@/additional_scripts/logout'

export default {
    name: "HomeInfoArea",
    data() {
        return {
            user: []
        }
    },
    methods: {
        displayName() {
            return `${this.user.first_name}  ${this.user.middle_name}  ${this.user.last_name}`
        },
        displayBirthday() {
            let birthday = new Date(this.user.birthday)
            const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

            return `${month[birthday.getMonth()]} ${birthday.getDate()}, ${birthday.getFullYear()}`
        },
    },
    async mounted() {
        let user = getCookie("user")

        if (user == "") {
            logout(this.$swal)
        }

        let user_id = JSON.parse(user).id

        getAxiosData(`${this.BASE_URL}/home/users.php?profile_id=${user_id}`)
        .then(result => {
            this.user = result.data
        })
    }
}
</script>

<style scoped>
.home_info_area {
    float: left;
    width: 250px;
    height: 100vh !important;
    position: fixed;
    z-index: -1;
    display: flex;
    /*justify-content: center;*/
    /*align-items: center;*/
    text-align: center;
    flex-direction: column;
}

.profile-picture {
    display: block;
    float: left;
    width: 240px;
    height: 30vh;
}

img {
    float: left;
    width: 100%;
    height: 90%;
    max-height: 250px;
    margin-left: 5px;
    margin-top: 5%;
}

.profile-details {
    width: 100%;
    float: left;
}

.profile-details button {
    width: 97% !important;
    margin-left: 0;
    text-align: left;
    background: rgba(0, 0, 0, 0);
    border: none;
}
</style>