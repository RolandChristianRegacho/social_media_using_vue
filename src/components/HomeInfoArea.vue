<template>
    <div class="home_info_area">
        <div class="profile-picture">
            <img v-bind:src="user.profile_picture" />
        </div>
        
        <div class="profile-details">
            <button>{{ displayName() }}</button>
            <button>{{ user.birthday }}</button>
        </div>
    </div>
</template>

<script>
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
            let user = this.getCookie("user")

            if (user == "") {
                logout(this.$swal, this.$router)
            }
            else {
                let user_id = JSON.parse(user).id

                getAxiosData(`${this.BASE_URL}/home/users.php?profile_id=${user_id}`)
                .then(result => {
                    this.user = result.data
                })

                return `${this.user.first_name}  ${this.user.middle_name}  ${this.user.last_name}`
            }
        }
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
    width: 250px;
    height: 30vh;
    border-bottom: 2px solid gray;
}

img {
    float: left;
    width: 100%;
    height: 90%;
    max-height: 250px;
    margin-left: 5px;
    margin-top: 5%;
    background: rgba(250, 250, 250, 1);
    border-radius: 100%;
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