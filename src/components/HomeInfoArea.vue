<template>
    <div class="home_info_area">
        <div class="profile-picture">
            <img src="../assets/image.png" />
        </div>
        <div class="profile-details">
            <button>{{ displayName() }}</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeInfoArea",
        data() {
            return {
                user: ""
            }
        },
        mounted() {
        },
        methods: {
            displayName() {
                let user = getCookie("user")

                if (user == "") {
                    logout()
                }
                else {
                    this.user = JSON.parse(user)
                    return `${this.user[0].first_name}  ${this.user[0].middle_name}  ${this.user[0].last_name}`
                }
            }
        }
    }

    function logout() {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.$router.push({ name: "LoginPage" })
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
    .home_info_area {
        float: left;
        width: 30%;
    }
    
    .profile-picture {
        float: left;
        width: 29vw;
        height: 30vh;
        border-bottom: 2px solid gray;
    }

    img {
        float: left;
        width: 90%;
        height: 90%;
        margin-left: 5%;
        margin-top: 5%;
        background: rgba(250, 250, 250, 1);
        border-radius: 100%;
    }

    .profile-details button {
        width: 97% !important;
        margin-left: 0;
        text-align: left;
        background: rgba(0, 0, 0, 0);
        border: none;
    }
</style>