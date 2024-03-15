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
                <form @submit.prevent="submit">
                    <input class="post_input" type="text" v-model="replies.reply" placeholder="Reply" />
                    <button class="post_button" @click="postReply(item.id)">Reply</button>
                </form>
            </div>
            <div class="user_post_right" >
                <button class="post_button_right" @click="deletePost(item.id)">Delete</button>
                <button class="post_button_right">Edit</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import swal from 'sweetalert';
export default {
    name: "HomePage",
    data() {
        return {
            posts: [],
            users: [],
            replies: {
                post_id: "",
                reply_user_id: "",
                reply: ""
            },
            //componentKey: 0
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

        this.emitter.on("onPost", () => {
            getPosts()
            .then(result => {
                this.posts = result
            })
        })
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
        },
        async postReply(post_id) {
            let user = getCookie("user")

            if (user == "") {
                this.$router.push({ name: "LoginPage" });
            }
            else {
                this.replies.reply_user_id = JSON.parse(user)[0].id
            }

            let data = {
                "post_id": post_id,
                "user_id": this.replies.reply_user_id,
                "reply": this.replies.reply
            }

            const result = await axios.post("http://localhost:3000/post_replies", data)

            if(result.status == 201) {
                this.replies.reply = ""
            }
        },
        async deletePost(id) {
            console.log(id)
            swal({
                title: "Are you sure to delete this post?",
                text: "Once deleted, you will not be able to recover this post!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your post has been deleted!", {
                    icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
        }
    }
}

async function getPosts() {
    const result_posts = await axios.get(`http://localhost:3000/posts?_sort=-date`)

    if (result_posts.status == 200) {
        if(result_posts.data != "") {
            return result_posts.data
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