<template>
    <div class="post_container">
        <div v-for="item in posts" class="user_post" :key="item.posts">
            <div class="user_post_sender">
                {{ item.user.first_name }} {{ item.user.last_name }}
            </div>
            <div class="user_post_content">
                {{ item.posts.content }}
            </div>
            <div class="user_post_time">
                {{ item.posts.date_time }}
            </div>
            <div class="user_post_left">
                <button class="post_button persist_button" @click="showReply(item.posts.id)" data-status="inactive"
                    :id="'rp-btn-' + item.posts.id">
                    <BxShow class="icon_show" />
                    <BxHide class="icon_hide" />
                    <p>Show Replies</p>
                </button>
                <form @submit.prevent="submit">
                    <input class="post_input" type="text" placeholder="Reply" :id="'rp-frm-' + item.posts.id" />
                    <button class="post_button" @click="postReply(item.posts.id)">Reply</button>
                </form>
            </div>
            <div class="user_post_right">
                <button class="post_button_right" @click="deletePost(item.posts.id)">
                    <AnTwotoneDelete class="icon" />
                    <p>Delete</p>
                </button>
                <button class="post_button_right">
                    <AnOutlinedEdit class="icon" />
                    <p>Edit</p>
                </button>
            </div>
            <div class="user_reply" :id="'reply-' + item.posts.id">
                <div v-for="replies, id in item.reply" class="user_reply_content" :key="id">
                    <div class="user_reply_pic">
                        <img :src="getReply(replies.sender, 'picture')" />
                    </div>
                    <div class="user_reply_sender">
                        {{ getReply(replies.sender, "sender") }}
                    </div>
                    <div class="user_reply_message">
                        {{ getReply(replies.reply, "content") }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import swal from 'sweetalert';
import $ from "jquery";
import { AnOutlinedEdit } from "@kalimahapps/vue-icons";
import { AnTwotoneDelete } from "@kalimahapps/vue-icons";
import { BxShow } from "@kalimahapps/vue-icons";
import { BxHide } from "@kalimahapps/vue-icons";

export default {
    name: "HomePage",
    data() {
        return {
            posts: [],
            replies: {
                post_id: "",
                reply_user_id: "",
                reply: ""
            },
        }
    },
    components: {
        AnOutlinedEdit,
        AnTwotoneDelete,
        BxShow,
        BxHide
    },
    async mounted() {
        let user = getCookie("user")

        if (user == "") {
            logout()
        }

        getPosts(this.BASE_URL)
            .then(result => {
                this.posts = result
            })

        this.emitter.on("onPost", () => {
            getPosts(this.BASE_URL)
                .then(result => {
                    this.posts = result
                })
        })
    },
    methods: {
        showReply(id) {
            const portrait = window.matchMedia("(orientation: portrait)").matches;

            if (portrait) {
                if ($("#rp-btn-" + id).attr("data-status") == "inactive") {
                    $(".icon_show").show()
                    $(".icon_hide").hide()
                    $("#rp-btn-" + id).attr("data-status", "active")
                    $("#reply-" + id).slideDown(500)
                }
                else {
                    $(".icon_show").hide()
                    $(".icon_hide").show()
                    $("#rp-btn-" + id).attr("data-status", "inactive")
                    $("#reply-" + id).slideUp(500)
                }
            }
            else {
                if ($("#rp-btn-" + id).text() == "Show Replies") {
                    $("#reply-" + id).slideDown(500)
                    $("#rp-btn-" + id).text("Hide Replies")
                    $("#rp-btn-" + id).attr("data-status", "active")
                }
                else {
                    $("#reply-" + id).slideUp(500)
                    $("#rp-btn-" + id).text("Show Replies")
                    $("#rp-btn-" + id).attr("data-status", "inactive")
                }
            }
        },
        getReply(data, type) {
            if (data == undefined) {
                return ""
            }

            if (type == "sender") {
                return data.first_name + " " + data.last_name
            }
            if (type == "content") {
                return data.content
            }
            if (type == "picture") {
                return data.profile_picture
            }
        },
        async postReply(post_id) {
            let user = getCookie("user")

            if (user == "") {
                this.$router.push({ name: "LoginPage" });
            }
            else {
                this.replies.reply_user_id = JSON.parse(user).id
                this.replies.reply = $("#rp-frm-" + post_id).val()
            }

            let data = {
                "reply": {
                    "post_id": post_id,
                    "content": this.replies.reply
                },
                "user_id": this.replies.reply_user_id
            }

            const result = await axios.post(`${this.BASE_URL}/home/post.php`, data)

            if (result.status == 200) {
                this.replies.reply = ""
                getPosts(this.BASE_URL)
                    .then(result => {
                        this.posts = result
                    })
            }
        },
        async deletePost(id) {
            this.$swal({
                title: 'Are you sure you want to delete this post?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    confirmButton: 'order-1',
                    denyButton: 'order-2',
                }
            }).then((result) => {
                if(result.isConfirmed) {
                    console.log(id)
                    swal("Poof! Your post has been deleted!", {
                        icon: "success",
                    });
                }
            })
        }
    }
}

async function getPosts(BASE_URL) {
    let user = getCookie("user")

    if (user == "") {
        logout()
    }

    const result_posts = await axios.get(`${BASE_URL}/home/post.php?id=${JSON.parse(user).id}`)

    if (result_posts.status == 200) {
        if (result_posts.data != "") {
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

<style scoped>
.icon {
    color: white;
    font-size: 2em;
    vertical-align: middle;
    display: none;
}

.icon_show {
    color: white;
    font-size: 2em;
    vertical-align: middle;
    display: none;
}

.icon_hide {
    color: white;
    font-size: 2em;
    vertical-align: middle;
    display: none;
}

@media only screen and (orientation: portrait) {
    .icon {
        display: block;
    }

    button p {
        display: none;
    }

    .icon_hide {
        display: block;
    }
}
</style>