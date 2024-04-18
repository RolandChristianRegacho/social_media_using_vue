<template>
    <div>
        <button @click="goHome" class="header_icon main_bg main_border"></button>
        <router-link class="main_bg_wHover" to="/" id="web_title">Social Crowd</router-link>
        <!--<a>{{ name }}</a>-->
        <form @submit.prevent="submit">
            <input type="search" id="search_txt" v-model="this.search.name" placeholder="Search a friend" />
            <button @click="searchPeople()" class="hiddenEnter">Search</button>
        </form>
        <button @click="showProfile" class="header_button tertiary_bg_wHover main_color_wHover">
            <AnOutlinedUser class="icon" />
        </button>
        <button @click="showNotifications" class="header_button tertiary_bg_wHover main_color_wHover notification" data-status="hidden">
            <AnOutlinedNotification class="icon" style="font-size: 2em; text-align: left;" />
            <p></p>
        </button>
        <button @click="showMessage" class="header_button tertiary_bg_wHover main_color_wHover message">
            <AnOutlinedMessage class="icon" style="font-size: 2em; text-align: left;" />
            <p></p>
        </button>
        <button @click="showMenu" class="header_button_mobile tertiary_bg_wHover main_color_wHover">
            <AnOutlinedMenuFold class="icon_mobile" style="font-size: 2em; text-align: left;" />
        </button>
        <button @click="hideMenu" class="header_button_mobile_hide tertiary_bg_wHover main_color_wHover">
            <AnOutlinedMenuUnfold class="icon_mobile" style="font-size: 2em; text-align: left;" />
        </button>
    </div>
    <div class="menu_div">
        <button class="main_bg_wHover main_color border_none" @click="showMessage">Messages</button>
        <button class="main_bg_wHover main_color border_none" @click="showNotifications">Notifications</button>
        <button class="main_bg_wHover main_color border_none" @click="goToProfile">Profile</button>
        <button class="main_bg_wHover main_color border_none" @click="goToProfile">Change Password</button>
        <button class="main_bg_wHover main_color border_none" @click="logout">Logout</button>
    </div>
    <div class="search_div main_bg main_color_wHover">
        <div class='search_result_div main_bg_wHover border_bottom_only_post' v-for="item in search_result" :key="item.id">
            <div class='search_result_name'>
                <button @click='viewUser(item.id);' class="inherit_bg main_color border_none">{{ item.first_name }} {{ item.middle_name }} {{ item.last_name
                    }}</button>
            </div>
            <div class='search_result_action' v-if="item.request_type == null">
                <button @click="sendFriendRequest(item.id);" class='search_result_action_accept inherit_bg_wHover main_color_wHover border_none'>Add</button>
            </div>
            <div class='search_result_action' v-else-if="item.request_type == 'sender'">
                <button @click="cancelSendFriendRequest(item.id);" class='search_result_action_accept inherit_bg_wHover main_color_wHover border_none'>Cancel</button>
            </div>
            <div class='search_result_action' v-else-if="item.request_type == 'friend'">
            </div>
            <div class='search_result_actions' v-else>
                <button @click="acceptFriendRequest(item.id);" class='search_result_action_accept inherit_bg_wHover main_color_wHover border_none'>Accept</button>
                <button @click="deleteFriendRequest(item.id);" class='search_result_action_accept inherit_bg_wHover main_color_wHover border_none'>Reject</button>
            </div>
        </div>
    </div>
    <div class="search_div_not_found main_bg main_color">
        <h1>Not Found</h1>
    </div>
    <div class="notifications_div main_bg main_color">
        <div class="notifications_result_div main_bg_wHover main_color border_bottom_only_post" v-for="item in notifications" :key="item.id">
            <div class="notification_result_div_for_full_height" v-if="item.context == 'Reply'">
                <div class="notifications_content_post">
                    <button class="main_bg_wHover main_color border_none" @click='goToPost(item.post_id);'>{{ item.first_name }} replied in your
                        post</button>
                </div>
            </div>
            <div v-else class="main_bg_wHover main_color">
                <div @click="goToProfileInNotif(item.sender)" class="notifications_content">
                    <button class="main_bg_wHover main_color border_none">{{ item.first_name }} sent you a friend
                        request</button>
                </div>
                <div class='notifications_action'>
                    <button @click="acceptFriendRequest(item.sender);"
                        class='search_result_action_accept inherit_bg_wHover main_color_wHover border_none'>Accept</button>
                    <button @click="deleteFriendRequest(item.id);" class='search_result_action_accept inherit_bg_wHover main_color_wHover border_none'>Reject</button>
                </div>
            </div>
        </div>
    </div>
    <div class="profile_div main_bg main_color">
        <button class="inherit_bg_wHover main_color_wHover border_none" @click="goToProfile">Profile</button>
        <button class="inherit_bg_wHover main_color_wHover border_none" @click="goToProfile">Change Password</button>
        <button class="secondary_bg border_none">
            <AkSquareFill class="color_theme_1" @click="changeColorTheme('default')"/>
            <AkSquareFill class="color_theme_2" @click="changeColorTheme('red')"/>
            <AkSquareFill class="color_theme_3" @click="changeColorTheme('blue')"/>
            <AkSquareFill class="color_theme_4" @click="changeColorTheme('violet')"/>
            <AkSquareFill class="color_theme_5" @click="changeColorTheme('pink')"/>
        </button>
        <button class="inherit_bg_wHover main_color_wHover border_none" @click="logout">Logout</button>
    </div>
</template>

<script>
import { AnOutlinedUser, AnOutlinedNotification, AnOutlinedMessage, AnOutlinedMenuFold, AnOutlinedMenuUnfold, AkSquareFill } from "@kalimahapps/vue-icons";
import $ from "jquery";
import { getAxiosData, postAxiosData, updateAxiosData, deleteAxiosData } from "@/additional_scripts/fetch-script";
import logout from "@/additional_scripts/logout";

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
        AnOutlinedMessage,
        AnOutlinedMenuFold,
        AnOutlinedMenuUnfold,
        AkSquareFill
    },
    methods: {
        logout() {
            logout(this.$swal)
        },
        goHome() {
            this.$router.push({ name: "HomePage" })
        },
        async searchPeople() {
            let user = this.getCookie("user")
            let user_id = ""

            if (user == "") {
                logout(this.$swal)
            }
            else {
                user_id = JSON.parse(user).id
            }

            getAxiosData(`${this.BASE_URL}/home/users.php?search=${this.search.name}&user_id=${user_id}`)
                .then(result => {
                    if (result.type == "found") {
                        this.search_result = result.data
                        $(".search_div").show()
                    }
                    else {
                        $(".search_div_not_found").show()
                    }
                })
        },
        viewUser(id) {
            this.$router.push(`/profile=${id}`)
        },
        async sendFriendRequest(id) {
            let user = this.getCookie("user")
            let user_id = ""

            if (user == "") {
                logout(this.$swal)
            }
            else {
                user_id = JSON.parse(user).id
            }
            let data = {
                "sender": user_id,
                "receiver": id,
                "content": "Friend Request"
            }

            postAxiosData(`${this.BASE_URL}/home/notifications.php`, data)
                .then(result => {
                    if (result.type == "success") {
                        this.$swal({
                            icon: "success",
                            title: "Friend Request Sent!"
                        })
                    }
                    else {
                        this.$swal({
                            icon: result.type,
                            text: result.message,
                        })
                    }
                })
        },
        async acceptFriendRequest(id) {
            let user = this.getCookie("user")
            let user_id = ""

            if (user == "") {
                logout(this.$swal)
            }
            else {
                user_id = JSON.parse(user).id
            }
            let data = {
                "sender_id": id,
                "receiver_id": user_id
            }

            postAxiosData(`${this.BASE_URL}/home/friends.php`, data)
                .then(result => {
                    if (result.type == "success") {
                        this.$swal({
                            icon: "success",
                            title: "Friend Request Accepted!"
                        })
                        getAxiosData(`${this.BASE_URL}/home/notifications.php?user_id=${user_id}`)
                            .then(response => {
                                if (response.type == "found") {
                                    if (response.unread_count > 9) {
                                        $(".notification p").text(" 9+")
                                    }
                                    else if (response.unread_count > 0 && response.unread_count < 10) {
                                        $(".notification p").text(`${response.unread_count}`)
                                    }
                                    else {
                                        $(".notification p").text("")
                                    }
                                    this.notifications = response.data
                                }
                                else {
                                    $(".notification p").text("")
                                    this.notifications = []
                                }
                            })
                    }
                    else {
                        this.$swal({
                            icon: result.type,
                            text: result.message,
                        })
                    }
                })
        },
        async cancelSendFriendRequest(id) {
            let user = this.getCookie("user")
            let user_id = ""

            if (user == "") {
                logout(this.$swal)
            }
            else {
                user_id = JSON.parse(user).id
            }
            let data = {
                "sender": user_id,
                "receiver": id
            }

            deleteAxiosData(`${this.BASE_URL}/home/notifications.php`, data)
                .then(result => {
                    if (result.type == "success") {
                        this.$swal({
                            icon: "success",
                            title: "Friend Request cancelled!"
                        })
                    }
                    else {
                        this.$swal({
                            icon: result.type,
                            text: result.message,
                        })
                    }
                })
        },
        async deleteFriendRequest(id) {
            let user = this.getCookie("user")
            let user_id = ""

            if (user == "") {
                logout(this.$swal)
            }
            else {
                user_id = JSON.parse(user).id
            }
            let data = {
                "sender": id,
                "receiver": user_id
            }

            deleteAxiosData(`${this.BASE_URL}/home/notifications.php`, data)
                .then(result => {
                    if (result.type == "success") {
                        this.$swal({
                            icon: "success",
                            title: "Friend Request deleted!"
                        })


                        getAxiosData(`${this.BASE_URL}/home/notifications.php?user_id=${user_id}`)
                            .then(response => {
                                if (response.type == "found") {
                                    if (response.unread_count > 9) {
                                        $(".notification p").text(" 9+")
                                    }
                                    else if (response.unread_count > 0 && response.unread_count < 10) {
                                        $(".notification p").text(`${response.unread_count}`)
                                    }
                                    else {
                                        $(".notification p").text("")
                                    }
                                    this.notifications = response.data
                                }
                                else {
                                    $(".notification p").text("")
                                    this.notifications = []
                                }
                            })
                    }
                    else {
                        this.$swal({
                            icon: result.type,
                            text: result.message,
                        })
                    }
                })
        },
        async showNotifications() {
            $(".notifications_div").attr("data-status", "clicked")
            $(".notifications_div").show()
            let user = this.getCookie("user")
            let user_id = ""

            if (user == "") {
                logout(this.$swal)
            }
            else {
                user_id = JSON.parse(user).id
            }

            let data = {
                "user_id": user_id
            }

            updateAxiosData(`${this.BASE_URL}/home/notifications.php`, data)
                .then(result => {
                    if (result.type == "success") {
                        getAxiosData(`${this.BASE_URL}/home/notifications.php?user_id=${user_id}`)
                            .then(response => {
                                if (response.type == "found") {
                                    if (response.unread_count > 9) {
                                        $(".notification p").text(" 9+")
                                    }
                                    else if (response.unread_count > 0 && response.unread_count < 10) {
                                        $(".notification p").text(`${response.unread_count}`)
                                    }
                                    else {
                                        $(".notification p").text("")
                                    }
                                    this.notifications = response.data
                                }
                                else {
                                    $(".notification p").text("")
                                    this.notifications = []
                                }
                            })
                    }
                    else {
                        this.$swal({
                            icon: result.data.type,
                            title: "Server Error!",
                            text: "There was a problem fetching your notifications",
                        })
                    }
                })
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
            this.$router.push({ name: "MessagePage" })
        },
        showMenu() {
            $(".menu_div").attr("data-status", "clicked")
            $(".menu_div").show();
            $(".header_button_mobile").hide()
            $(".header_button_mobile_hide").show()
        },
        hideMenu() {
            $(".menu_div").attr("data-status", "hidden")
            $(".menu_div").hide()
            $(".header_button_mobile_hide").hide()
            $(".header_button_mobile").show()
        },
        goToProfile() {
            let user = this.getCookie("user")
            let user_id = ""

            if (user == "") {
                logout(this.$swal)
            }
            else {
                user_id = JSON.parse(user).id
            }

            this.$router.push(`/profile=${user_id}`)
        },
        goToProfileInNotif(id) {
            this.$router.push(`/profile=${id}`)
        },
        async changeColorTheme(color) {
            let user = this.getCookie("user")
            let user_id = ""

            if (user == "") {
                logout(this.$swal)
            }
            else {
                user_id = JSON.parse(user).id
            }

            let data = {
                user_id: user_id,
                color: color
            }

            postAxiosData(`${this.BASE_URL}/home/theme.php`, data)
            .then(result => {
                this.$swal({
                    icon: result.type,
                    text: result.message,
                })
                .then(response => {
                    if(response) {
                        if(result.type == "success") {
                            window.location.href = "/"
                        }
                    }
                })
            })
        }
    },
    async mounted() {
        let user = this.getCookie("user")
        let user_id = ""

        if (user == "") {
            logout(this.$swal)
        }
        else {
            this.name = JSON.parse(user).first_name
            user_id = JSON.parse(user).id
        }

        getAxiosData(`${this.BASE_URL}/home/notifications.php?user_id=${user_id}`)
            .then(response => {
                if (response.type == "found") {
                    if (response.unread_count > 9) {
                        $(".notification p").text(" 9+")
                    }
                    else if (response.unread_count > 0 && response.unread_count < 10) {
                        $(".notification p").text(`${response.unread_count}`)
                    }
                    else {
                        $(".notification p").text("")
                    }
                    this.notifications = response.data
                }
                else {
                    $(".notification p").text("")
                    this.notifications = []
                }
            })

        getAxiosData(`${this.BASE_URL}/home/messages.php?user_id=${user_id}`)
            .then(response => {
                if (response.type == "found") {
                    if (response.unread_count > 9) {
                        $(".message p").text(" 9+")
                    }
                    else if (response.unread_count > 0 && response.unread_count < 10) {
                        $(".message p").text(`${response.unread_count}`)
                    }
                    else {
                        $(".message p").text("")
                    }
                    this.unread_messages = response.unread_count
                }
                else {
                    $(".message p").text("")
                }
            })

        this.emitter.on("readMessage", () => {
            getAxiosData(`${this.BASE_URL}/home/messages.php?user_id=${user_id}`)
                .then(response => {
                    if (response.type == "found") {
                        if (response.unread_count > 9) {
                            $(".message p").text(" 9+")
                        }
                        else if (response.unread_count > 0 && response.unread_count < 10) {
                            $(".message p").text(`${response.unread_count}`)
                        }
                        else {
                            $(".message p").text("")
                        }
                        this.unread_messages = response.unread_count
                    }
                    else {
                        $(".message p").text("")
                    }
                })
        })
    }
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

.header_button {
    float: right;
    height: 50px;
    width: 75px;
    margin-top: 5px;
    margin-right: 10px;
    font-size: 1em;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 100%;
}

.header_button_mobile {
    float: right;
    height: 50px;
    width: 50px;
    margin-top: 5px;
    margin-right: 10px;
    font-size: 1em;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 100%;
    display: none;
}

.header_button_mobile_hide {
    float: right;
    height: 50px;
    width: 50px;
    margin-top: 5px;
    margin-right: 10px;
    font-size: 1em;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 100%;
    display: none;
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
    display: none;
}

.search_div_not_found {
    position: fixed;
    z-index: 100 !important;
    top: 60px;
    left: 180px;
    width: 308px;
    height: 400px;
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
    display: none;
}

.profile_div button {
    width: 100%;
}

.menu_div {
    position: fixed;
    z-index: 100 !important;
    top: 60px;
    right: 0px;
    width: 268px;
    height: auto;
    min-height: 80px;
    display: none;
}

.menu_div button {
    width: 100%;
}

@media only screen and (orientation: portrait) {
    #web_title {
        display: none;
    }

    input[type="search"] {
        width: 230px;
        margin-left: 10px !important;
    }

    .header_button {
        display: none;
    }

    .icon {
        font-size: 2em;
        vertical-align: middle;
    }

    .header_button_mobile {
        display: block;
    }

    .search_div {
        left: 0;
        width: 100%;
    }
}
</style>