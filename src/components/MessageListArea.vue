<template>
    <div class="user_list">
        <div v-for="item in users" :key="item.id" class="user_list_items">
            <button @click="selectUser(item.id)">{{ item.first_name }} {{ item.last_name }}</button>
        </div>
    </div>
</template>

<script>
import axios from "axios"

    export default {
        name: "MessageList",
        data() {
            return {
                users: []
            }
        },
        methods: {
            selectUser(id) {
                this.emitter.emit("selectUser", id)
            }
        },
        async mounted() {
            let user = getCookie("user")

            if (user == "") {
                logout()
            }

            const result = await axios.get(`${this.BASE_URL}/home/users.php?user_id=${JSON.parse(user).id}`)

            if(result.status == 200) {
                this.users = result.data.data
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
    .user_list {
        float: left;
        width: 100%;
        height: 100%;
    }

    .user_list_items {
        float: left;
        width: 100%;
        height: 50px;
        border-bottom: 2px solid gray;
        margin-top: 10px;
    }

    .user_list_items button {
        float: left;
        width: 100%;
        height: 99%;
        background: inherit;
        border: none;
        text-align: left;
        padding-left: 10px;
    }

    .user_list_items button:hover {
        background: rgb(52, 73, 94);
    }
</style>