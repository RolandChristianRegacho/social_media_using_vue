<template>
    <div>
        <button @click="goHome" class="header_icon"></button>
        <router-link to="/">Social Crowd</router-link>
        <!--<a>{{ name }}</a>-->
        <form @submit.prevent="submit">
            <input type="search" id="search_txt" v-model="this.search.name" placeholder="Search a friend" />
            <button @click="searchPeople()" class="hiddenEnter">Search</button>
        </form>
        <button @click="logout" class="header_button">
            <AnOutlinedLogout class="icon" />
        </button>
        <button class="header_button">
            <AnOutlinedNotification class="icon" />
        </button>
        <button class="header_button">
            <AnOutlinedSetting class="icon" />
        </button>
        <button class="header_button">
            <AnOutlinedUser class="icon" />
        </button>
    </div>
    <div class="search_div">
        <div class='search_result_div' v-for="item in search_result" :key="item.id">
            <div class='search_result_name'>
                <button @click='viewUser(item.id);'>{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}</button>
            </div>
            <div class='search_result_prompt'>
                <button>Add Friend?</button>
            </div>
            <div class='search_result_action'>
                <button @click="sendFriendRequest(item.id);" class='search_result_action_accept'>Add</button>
                <button class='search_result_action_reject'>Reject</button>
            </div>
        </div>
    </div>
    <div class="search_div_not_found">
        <h1>Not Found</h1>
    </div>
</template>

<script>
import { AnOutlinedLogout } from "@kalimahapps/vue-icons";
import { AnOutlinedUser } from "@kalimahapps/vue-icons";
import { AnOutlinedSetting } from "@kalimahapps/vue-icons";
import { AnOutlinedNotification } from "@kalimahapps/vue-icons";
import axios from "axios";
import $ from "jquery";
import swal from 'sweetalert';

export default {
    name: "HeaderButton",
    data() {
        return {
            name: "",
            search: {
                name: ""
            },
            search_result: []
        }
    },
    components: {
        AnOutlinedLogout,
        AnOutlinedUser,
        AnOutlinedSetting,
        AnOutlinedNotification
    },
    methods: {
        logout() {
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            this.$router.push({ name: "LoginPage" })
        },
        goHome() {
            this.$router.push({ name: "HomePage" })
        },
        async searchPeople() {
            let user = getCookie("user")
            let user_id = ""

            if (user == "") {
                this.$router.push({ name: "LoginPage" });
            }
            else {
                user_id = JSON.parse(user).id
            }

            const result = await axios.get(`${this.BASE_URL}/home/users.php?search=${this.search.name}&user_id=${user_id}`)

            if (result.status == 200) {
                if (result.data.type == "found") {
                    this.search_result = result.data.data
                    $(".search_div").show()
                }
                else {
                    $(".search_div_not_found").show()
                }
            }
        },
        viewUser(id) {
            console.log(id)
        },
        async sendFriendRequest(id) {
            let user = getCookie("user")
            let user_id = ""

            if (user == "") {
                this.$router.push({ name: "LoginPage" });
            }
            else {
                user_id = JSON.parse(user).id
            }
            let data = {
                "sender": user_id,
                "receiver": id,
                "content": "Friend Request"
            }

            const result = await axios.post(`${this.BASE_URL}/home/notifications.php`, data)

            if (result.status == 200) {
                swal({
                    icon: "success",
                    title: "Friend Request Sent!"
                })
            }
        }
    },
    mounted() {
        let user = getCookie("user")

        if (user == "") {
            this.$router.push({ name: "LoginPage" });
        }
        else {
            this.name = JSON.parse(user).first_name
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
a {
    float: left;
    color: white;
    padding: 14px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 5px;
}

a:hover {
    background: rgb(52, 73, 94);
    color: white;
}

.header_button {
    float: right;
    height: 50px;
    width: 50px;
    margin-top: 5px;
    margin-right: 10px;
    background: rgba(58, 91, 98, 1);
    color: rgba(250, 250, 250, 1);
    font-size: 1em;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 100%;
}

.header_button:hover {
    background: rgba(78, 111, 118, 1);
}

.header_icon {
    background: url("@/assets/favicon.png");
    background-size: 100% 100%;
    height: 100%;
    width: 50px;
    height: 58px;
    font-size: 20px;
    float: left;
}

.icon {
    color: white;
    font-size: 2em;
    vertical-align: middle;
}

input[type="search"] {
    float: left;
    margin-left: 0 !important;
    margin-bottom: 0;
    margin-top: 10px;
    border-radius: 10px 10px 10px 10px;
    outline: none;
}

input[type="search"]:focus {
    font-size: 1.2em;
    transition-duration: 0.5s;
}

.hiddenEnter {
    display: none;
}

.search_div {
    position: fixed;
    z-index: 100 !important;
    top: 60px;
    left: 180px;
    width: 308px;
    height: 400px;
    background: rgba(38, 71, 78, 1);
    display: none;
}

.search_div_not_found {
    position: fixed;
    z-index: 100 !important;
    top: 60px;
    left: 180px;
    width: 308px;
    height: 400px;
    background: rgba(38, 71, 78, 1);
    display: none;
}
</style>