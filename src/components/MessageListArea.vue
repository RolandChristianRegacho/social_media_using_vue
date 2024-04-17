<template>
    <div class="user_list">
        <div class="user_list_items">
            <button class="btnUserListInactive main_bg_wHover main_color" style="text-align: center;">New Message</button>
        </div>
        <div v-for="item in users" :key="item.id" class="user_list_items">
            <button class="btnUserListInactive main_bg_wHover main_color" @click="selectUser(item.id, item.first_name + ' ' + item.last_name)"
                :id="'btnUserList-' + item.id">{{
                    item.first_name }} {{ item.last_name }}<p v-if="item.unread_count > 0">{{ item.unread_count }}</p>
            </button>
        </div>
    </div>
</template>

<script>
import { getAxiosData } from "@/additional_scripts/fetch-script"
import logout from "@/additional_scripts/logout"
import $ from "jquery"

export default {
    name: "MessageList",
    data() {
        return {
            users: []
        }
    },
    methods: {
        selectUser(id, name) {
            $(".btnUserListActive").attr("disabled", false)
            $(".btnUserListActive").attr("class", "btnUserListInactive main_bg_wHover main_color")
            this.emitter.emit("selectUser", id)
            if (window.matchMedia("(orientation: portrait)").matches) {
                $(".message_list_div").hide()
            }

            $(".message_nav_div").show()
            $(".message_page_div").show()
            $(".message_form_div").show()
            this.emitter.emit("selectUserName", name)

            $("#btnUserList-" + id).attr("class", "btnUserListActive main_color active_bg")
            $("#btnUserList-" + id).attr("disabled", true)
        }
    },
    async mounted() {
        let user = this.getCookie("user")

        if (user == "") {
            logout(this.$swal)
        }

        getListOfUser(this.BASE_URL, JSON.parse(user).id)
            .then(result => {
                this.users = result.data
            })

        this.emitter.on("readMessage", () => {
            getListOfUser(this.BASE_URL, JSON.parse(user).id)
                .then(result => {
                    this.users = result.data
                })
        })
    }
}

async function getListOfUser(url, id) {
    return getAxiosData(`${url}/home/users.php?user_id=${id}`)
}
</script>

<style scoped>
.user_list {
    float: left;
    width: 100%;
    height: 100%;
}

.user_list_items {
    float: left;
    width: 100%;
    height: 100px;
    margin-top: 10px;
}

.btnUserListInactive {
    float: left;
    width: 80%;
    height: 80%;
    border: none;
    text-align: left;
    padding-left: 10px;
    margin-left: 10%;
    border-radius: 5px;
    box-shadow: 3px 0px 5px 3px rgba(20, 20, 20, 1);
}

.btnUserListActive {
    float: left;
    width: 80%;
    height: 80%;
    border: none;
    text-align: left;
    padding-left: 10px;
    margin-left: 10%;
    border-radius: 5px;
    box-shadow: 3px 0px 5px 3px rgba(20, 20, 20, 1);
}

p {
    float: right;
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
</style>