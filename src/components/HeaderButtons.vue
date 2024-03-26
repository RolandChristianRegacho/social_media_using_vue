<template>
    <div>
        <button @click="goHome" class="header_icon"></button>
        <router-link to="/">Social Crowd</router-link>
        <!--<a>{{ name }}</a>-->
        <form @submit.prevent="submit">
            <input type="search" id="search_txt" v-model="this.search.name" placeholder="Search a friend" />
            <button @click="searchPeople()" class="hiddenEnter">Search</button>
        </form>
        <button @click="showProfile" class="header_button">
            <AnOutlinedUser class="icon" />
        </button>
        <button @click="showNotifications" class="header_button notification" data-status="hidden">
            <AnOutlinedNotification class="icon" style="font-size: 2em; text-align: left;" />
            <p></p>
        </button>
        <button @click="showMessage" class="header_button message">
            <AnOutlinedMessage class="icon" style="font-size: 2em; text-align: left;"  />
            <p></p>
        </button>
    </div>
    <div class="search_div">
        <div class='search_result_div' v-for="item in search_result" :key="item.id">
            <div class='search_result_name'>
                <button @click='viewUser(item.id);'>{{ item.first_name }} {{ item.middle_name }} {{ item.last_name
                    }}</button>
            </div>
            <div class='search_result_action' v-if="item.request_type == null">
                <button @click="sendFriendRequest(item.id);" class='search_result_action_accept'>Add</button>
            </div>
            <div class='search_result_action' v-else-if="item.request_type == 'sender'">
                <button @click="cancelSendFriendRequest(item.id);" class='search_result_action_accept'>Cancel</button>
            </div>
            <div class='search_result_actions' v-else>
                <button @click="sendFriendRequest(item.id);" class='search_result_action_accept'>Accept</button>
                <button @click="deleteFriendRequest(item.id);" class='search_result_action_accept'>Reject</button>
            </div>
        </div>
    </div>
    <div class="search_div_not_found">
        <h1>Not Found</h1>
    </div>
    <div class="notifications_div">
        <div class="notifications_result_div" v-for="item in notifications" :key="item.id">
            <div class="notification_result_div_for_full_height" v-if="item.context == 'Reply'">
                <div class="notifications_content_post">
                    <button @click='goToPost(item.post_id);'>{{ item.first_name }} replied in your
                        post</button>
                </div>
            </div>
            <div v-else>
                <div @click="goToProfileInNotif(item.sender)" class="notifications_content">
                    <button>{{ item.first_name }} sent you a friend
                        request</button>
                </div>
                <div class='notifications_action'>
                    <button onClick="sendFriendRequest(${data[items].id});"
                        class='search_result_action_accept'>Accept</button>
                    <button class='search_result_action_reject'>Reject</button>
                </div>
            </div>
        </div>
    </div>
    <div class="profile_div">
        <button @click="goToProfile">Profile</button>
        <button @click="goToProfile">Change Password</button>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import { AnOutlinedUser } from "@kalimahapps/vue-icons";
import { AnOutlinedNotification } from "@kalimahapps/vue-icons";
import { AnOutlinedMessage } from "@kalimahapps/vue-icons";
import axios from "axios";
import $ from "jquery";

export default {
    name: "HeaderButton",
    data() {
        return {
            name: "",
            search: {
                name: ""
            },
            search_result: [],
            notifications: [],
            unread_messages: ""
        }
    },
    components: {
        AnOutlinedUser,
        AnOutlinedNotification,
        AnOutlinedMessage
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
            this.$router.push(`/profile=${id}`)
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
                this.$swal({
                    icon: "success",
                    title: "Friend Request Sent!"
                })
            }
        },
        async cancelSendFriendRequest(id) {
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
                "receiver": id
            }

            const result = await axios.delete(`${this.BASE_URL}/home/notifications.php`, {data:data})

            if (result.status == 200) {
                this.$swal({
                    icon: "success",
                    title: "Friend Request cancelled!"
                })
            }
        },
        async deleteFriendRequest(id) {
            let user = getCookie("user")
            let user_id = ""

            if (user == "") {
                this.$router.push({ name: "LoginPage" });
            }
            else {
                user_id = JSON.parse(user).id
            }
            let data = {
                "sender": id,
                "receiver": user_id
            }

            const result = await axios.delete(`${this.BASE_URL}/home/notifications.php`, {data:data})

            if (result.status == 200) {
                this.$swal({
                    icon: "success",
                    title: "Friend Request cancelled!"
                })
            }

            const response = await axios.get(`${this.BASE_URL}/home/notifications.php?user_id=${JSON.parse(user).id}`)

            if (response.status == 200) {
                if (response.data.type == "found") {
                    this.notifications = response.data.data
                    if (response.data.unread_count > 9) {
                        $(".notification p").text(" 9+")
                    }
                    else if (response.data.unread_count > 0 && response.data.unread_count < 10) {
                        $(".notification p").text(`${response.data.unread_count}`)
                    }
                    else {
                        $(".notification p").text("")
                    }
                }
            }
        },
        async showNotifications() {
            $(".notifications_div").attr("data-status", "clicked")
            $(".notifications_div").show()
            let user = getCookie("user")
            let user_id = ""

            if (user == "") {
                this.$router.push({ name: "LoginPage" });
            }
            else {
                user_id = JSON.parse(user).id
            }

            let data = {
                "user_id": user_id
            }

            const result = await axios.put(`${this.BASE_URL}/home/notifications.php`, data)

            if (result.status == 200) {
                const result = await axios.get(`${this.BASE_URL}/home/notifications.php?user_id=${JSON.parse(user).id}`)

                if (result.status == 200) {
                    if (result.data.type == "found") {
                        this.notifications = result.data.data
                        if (result.data.unread_count > 9) {
                            $(".notification p").text(" 9+")
                        }
                        else if (result.data.unread_count > 0 && result.data.unread_count < 10) {
                            $(".notification p").text(`${result.data.unread_count}`)
                        }
                        else {
                            $(".notification p").text("")
                        }
                    }
                }
            }
            else {
                this.$swal({
                    icon: result.data.type,
                    title: "Server Error!",
                    text: "There was a problem fetching your notifications",
                })
            }
        },
        goToPost(id) {
            if (this.$router.currentRoute._value.name == "PostPage") {
                this.emitter.emit("onChangePost", id);
            }
            else {
                this.$router.push(`/post=${id}`)
            }
        },
        showProfile() {
            $(".profile_div").attr("data-status", "clicked")
            $(".profile_div").show()
        },
        showMessage() {
            this.$router.push({name:"MessagePage"})
        },
        goToProfile() {
            let user = getCookie("user")
            let user_id = ""

            if (user == "") {
                this.$router.push({ name: "LoginPage" });
            }
            else {
                user_id = JSON.parse(user).id
            }

            this.$router.push(`/profile=${user_id}`)
        },
        goToProfileInNotif(id) {
            this.$router.push(`/profile=${id}`)
        }
    },
    async mounted() {
        let user = getCookie("user")

        if (user == "") {
            this.$router.push({ name: "LoginPage" });
        }
        else {
            this.name = JSON.parse(user).first_name
        }

        const result = await axios.get(`${this.BASE_URL}/home/notifications.php?user_id=${JSON.parse(user).id}`)

        if (result.status == 200) {
            if (result.data.type == "found") {
                this.notifications = result.data.data
                if (result.data.unread_count > 9) {
                    $(".notification p").text(" 9+")
                }
                else if (result.data.unread_count > 0 && result.data.unread_count < 10) {
                    $(".notification p").text(`${result.data.unread_count}`)
                }
                else {
                    $(".notification p").text("")
                }
            }
        }

        const response = await axios.get(`${this.BASE_URL}/home/messages.php?user_id=${JSON.parse(user).id}`)

        if (response.status == 200) {
            if (response.data.type == "found") {
                this.unread_messages = response.data.unread_count
                if (response.data.unread_count > 9) {
                    $(".message p").text(" 9+")
                }
                else if (response.data.unread_count > 0 && response.data.unread_count < 10) {
                    $(".message p").text(`${response.data.unread_count}`)
                }
                else {
                    $(".message p").text("")
                }
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
    width: 75px;
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

.notification p {
    margin: 0;
    float: right;
    background: rgba(200, 50, 50, 1);
    animation-name: animateNotification;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

.message p {
    margin: 0;
    float: right;
    background: rgba(200, 50, 50, 1);
    animation-name: animateNotification;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

@keyframes animateNotification {
    0% {
        background: inherit;
    }

    100% {
        background: rgba(200, 50, 50, 1);
    }
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

.notification-icon {
    color: red !important;
    font-size: 1.5em !important;
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

.notifications_div {
    position: fixed;
    z-index: 100 !important;
    top: 60px;
    right: 0px;
    width: 268px;
    height: auto;
    min-height: 400px;
    background: rgba(38, 71, 78, 1);
    display: none;
}

.profile_div {
    position: fixed;
    z-index: 100 !important;
    top: 60px;
    right: 0px;
    width: 268px;
    height: auto;
    min-height: 80px;
    background: rgba(38, 71, 78, 1);
    display: none;
}

.profile_div button {
    width: 100%;
}
</style>