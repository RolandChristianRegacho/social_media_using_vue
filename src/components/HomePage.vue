<template>
    <br>
    <div class="post_container">
        <div v-for="item in posts" class="user_post" :key="item.id">
            <div class="user_post_sender">
                {{ checkData(item.user_id) }}
            </div>
            <div class="user_post_content">
                {{ item.post }}
            </div>
            <div class="user_post_time" >
                {{ displayDate(item.date) }}
            </div>
            <div class="user_post_left" >
                <button class="post_button persist_button">Show Replies</button>
                <input class="post_input" type="text" placeholder="Reply" />
                <button class="post_button">Reply</button>
            </div>
            <div class="user_post_right" >
                <button class="post_button_right">Delete</button>
                <button class="post_button_right">Edit</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "HomePage",
    data() {
        return {
            posts: [],
            users: []
        }
    },
    async mounted() {
        let user = getCookie("user")
        //let user_id = ""

        if (user == "") {
            logout()
        }
        else {
            //user_id = JSON.parse(user)[0].id
        }
        //const result = await axios.get(`http://localhost:3000/posts?user_id=${user_id}`)
        const result_posts = await axios.get(`http://localhost:3000/posts?_sort=-date`)

        if (result_posts.status == 200) {
            if(result_posts.data != "") {
                this.posts = result_posts.data
            }
        }

        const result_users = await axios.get(`http://localhost:3000/user`)

        if (result_users.status == 200) {
            if(result_users.data != "") {
                this.users = result_users.data
            }
        }
    },
    methods: {
        checkData(id) {
            for(let items in this.users) {
                if(id == this.users[items].id) {
                    return this.users[items].first_name
                }
            }
        },
        displayDate(date) {
            const d = new Date(date)
            const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

            return `${month[d.getMonth()]} ${d.getDate()} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
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