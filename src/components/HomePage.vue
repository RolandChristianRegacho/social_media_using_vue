<template>
    <div class="post_container main_color" v-if="posts.length == 0">
        <br>
        <br>
        No Posts To Show
    </div>
    <div class="post_container main_color" v-else>
        <div v-for="item in posts" class="user_post post_bg" :key="item.posts">
            <div @click="goToProfile(item.user.id)" class="user_post_sender border_bottom_only_post">
                {{ item.user.first_name }} {{ item.user.last_name }}
            </div>
            <div @click="goToPost(item.posts.id, $event)" class="user_post_content border_bottom_only_post">
                <p>{{ item.posts.content }}</p>
                <br>
                <br>
                <div class="image_in_post" v-if="item.posts.image != null"
                    :style="{ backgroundImage: 'url(\'' + item.posts.image + '\')', backgroundPosition: 'center center', backgroundSize: '100%, 100%', backgroundRepeat: 'no-repeat' }">
                </div>
            </div>
            <div class="user_post_time">
                {{ item.posts.date }}
            </div>
            <div class="user_post_left">
                <button v-if="item.reply.length > 0" class="post_button persist_button icon_show main_bg_wHover main_color main_border"
                    @click="showReply(item.posts.id)" data-status="active" :id="'rp-btn-shw-' + item.posts.id">
                    <BxShow />
                </button>
                <button class="post_button persist_button icon_hide main_bg_wHover main_color main_border"
                    @click="hideReply(item.posts.id)" data-status="inactive" :id="'rp-btn-hdn-' + item.posts.id"
                    style="display: none;">
                    <BxHide />
                </button>
                <button v-if="item.reply.length > 0" class="post_button persist_button rp-btn-shw-wrd main_bg_wHover main_color main_border"
                    @click="showReply(item.posts.id)" data-status="active" :id="'rp-btn-shw-wrd-' + item.posts.id">
                    Show Replies
                </button>
                <button class="post_button persist_button rp-btn-hdn-wrd main_bg_wHover main_color main_border"
                    @click="hideReply(item.posts.id)" data-status="inactive" :id="'rp-btn-hdn-wrd-' + item.posts.id"
                    style="display: none;">
                    Hide Replies
                </button>
                <form @submit.prevent="submit">
                    <input class="post_input" type="text" placeholder="Reply" :id="'rp-frm-' + item.posts.id" @input="checkReplyLength(item.posts.id)" />
                    <button class="post_button main_bg_wHover main_color main_border"
                        @click="postReply(item.posts.id)" :id="'reply-btn-' + item.posts.id" disabled>Reply</button>
                </form>
            </div>
            <div class="user_post_right" v-if="item.user.id == this.owner">
                <button class="post_button_right main_bg_wHover main_color main_border"
                    @click="deletePost(item.posts.id)">
                    <AnTwotoneDelete class="icon" />
                    <p>Delete</p>
                </button>
                <button :id="'edit-' + item.posts.id" class="post_button_right main_bg_wHover main_color main_border"
                    @click="editPost(item.posts.id)">
                    <AnOutlinedEdit class="icon" />
                    <p>Edit</p>
                </button>
            </div>
            <div class="user_reply" :id="'reply-' + item.posts.id">
                <div v-for="replies, id in item.reply" class="user_reply_content" :key="id">
                    <div class="user_reply_pic border_bottom_only_post border_right_only_post">
                        <img :src="getReply(replies.sender, 'picture')" />
                    </div>
                    <div @click="goToProfile(replies.sender.id)" class="user_reply_sender">
                        {{ getReply(replies.sender, "sender") }}
                    </div>
                    <div class="user_reply_message border_bottom_only_post">
                        {{ getReply(replies.reply, "content") }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <FooterPage />
</template>

<script>
import $ from "jquery";
import { AnOutlinedEdit, AnTwotoneDelete, BxShow, BxHide } from "@kalimahapps/vue-icons";
import { deleteAxiosData, getAxiosData, postAxiosData } from "@/additional_scripts/fetch-script";
import FooterPage from '../components/FooterPage.vue'
import logout from "@/additional_scripts/logout";
import { getCookie } from "@/additional_scripts/cookie-handler";

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
            owner: "",
            socket: null,
            message: []
        }
    },
    components: {
        AnOutlinedEdit,
        AnTwotoneDelete,
        BxShow,
        BxHide,
        FooterPage
    },
    async mounted() {
        let user = getCookie("user")

        if (user == "") {
            logout(this.$swal)
        }
        this.owner = JSON.parse(user).id

        getPosts(this.BASE_URL, user)
            .then(result => {
                this.posts = result.post
            })

        this.emitter.on("onPost", () => {
            getPosts(this.BASE_URL, user)
                .then(result => {
                    this.posts = result.post
                })
        })
    },
    methods: {
        showReply(id) {
            const portrait = window.matchMedia("(orientation: portrait)").matches;

            if (portrait) {
                if ($("#rp-btn-shw-" + id).attr("data-status") == "active") {
                    $("#rp-btn-shw-" + id).hide()
                    $("#rp-btn-hdn-" + id).show()
                    $("#rp-btn-shw-" + id).attr("data-status", "inactive")
                    $("#rp-btn-hdn-" + id).attr("data-status", "active")
                    $("#reply-" + id).slideDown(500)
                    $("#rp-btn-shw-wrd-" + id).attr("data-status", "inactive")
                    $("#rp-btn-hdn-wrd-" + id).attr("data-status", "active")
                }
            }
            else {
                if ($("#rp-btn-shw-wrd-" + id).attr("data-status") == "active") {
                    $("#rp-btn-shw-wrd-" + id).hide()
                    $("#rp-btn-hdn-wrd-" + id).show()
                    $("#rp-btn-shw-wrd-" + id).attr("data-status", "inactive")
                    $("#rp-btn-hdn-wrd-" + id).attr("data-status", "active")
                    $("#reply-" + id).slideDown(500)
                    $("#rp-btn-shw-" + id).attr("data-status", "inactive")
                    $("#rp-btn-hdn-" + id).attr("data-status", "active")
                }
            }
        },
        hideReply(id) {
            const portrait = window.matchMedia("(orientation: portrait)").matches;

            if (portrait) {
                if ($("#rp-btn-hdn-" + id).attr("data-status") == "active") {
                    $("#rp-btn-hdn-" + id).hide()
                    $("#rp-btn-shw-" + id).show()
                    $("#rp-btn-hdn-" + id).attr("data-status", "inactive")
                    $("#rp-btn-shw-" + id).attr("data-status", "active")
                    $("#reply-" + id).slideUp(500)
                    $("#rp-btn-hdn-wrd-" + id).attr("data-status", "inactive")
                    $("#rp-btn-shw-wrd-" + id).attr("data-status", "active")
                }
            }
            else {
                if ($("#rp-btn-hdn-wrd-" + id).attr("data-status") == "active") {
                    $("#rp-btn-hdn-wrd-" + id).hide()
                    $("#rp-btn-shw-wrd-" + id).show()
                    $("#rp-btn-hdn-wrd-" + id).attr("data-status", "inactive")
                    $("#rp-btn-shw-wrd-" + id).attr("data-status", "active")
                    $("#reply-" + id).slideUp(500)
                    $("#rp-btn-hdn-" + id).attr("data-status", "inactive")
                    $("#rp-btn-shw-" + id).attr("data-status", "active")
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
                logout(this.$swal)
            }
            else {
                this.replies.reply_user_id = JSON.parse(user).id
                this.replies.reply = $("#rp-frm-" + post_id).val()
            }

            if(this.replies.reply == "") {
                return
            }

            let data = {
                "reply": {
                    "post_id": post_id,
                    "content": this.replies.reply
                },
                "user_id": this.replies.reply_user_id
            }

            postAxiosData(`${this.BASE_URL}/home/post.php`, data)
                .then(result => {
                    if (result.type == "success") {
                        this.$swal({
                            icon: "success",
                            text: "Reply sent!",
                        })
                        this.replies.reply = ""
                        getPosts(this.BASE_URL, user)
                            .then(result => {
                                this.posts = result.post
                            })
                    }
                    else {
                        this.$swal({
                            icon: result.type,
                            text: result.text,
                        })
                    }
                })
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
                if (result.isConfirmed) {
                    let data = {
                        post_id: id
                    }

                    deleteAxiosData(`${this.BASE_URL}/home/post.php`, data)
                        .then(result => {
                            this.emitter.emit("onPost");
                            this.$swal({
                                icon: result.type,
                                text: result.text,
                            })
                        })
                }
            })
        },
        goToPost(id, event) {
            if (event.target.nodeName == "SPAN" || event.target.className == "user_post_content border_bottom_only_post") {
                this.$router.push(`/post=${id}`)
            }
            else if(event.target.nodeName == "P") {
                if(event.target.contentEditable == "true") {
                    return
                }
                else {
                    this.$router.push(`/post=${id}`)
                }
            }
            else {
                for (let i in this.posts) {
                    if (this.posts[i].posts.id == id) {
                        $("#zoomImageImd").attr("src", this.posts[i].posts.image)
                        $("#zoomImageDiv").attr("style", "display: flex;")
                        break
                    }
                }
            }
        },
        goToProfile(id) {
            this.$router.push(`/profile=${id}`)
        },
        sanitizeContent(content) {
            let splitted_content = content.split("\n")

            return splitted_content.join(" <br>")
        },
        editPost(id) {
            $("#grayEditPg").attr("style", "display: flex;")

            this.emitter.emit("onEditPost", id);
        },
        checkReplyLength(id) {
            if($("#rp-frm-" + id).val().length > 0) {
                $("#reply-btn-" + id).attr("disabled", false)
            }
            else {
                $("#reply-btn-" + id).attr("disabled", true)
            }
        }
    }
}

async function getPosts(BASE_URL, user) {
    if (user == "") {
        logout(this.$swal)
    }

    return getAxiosData(`${BASE_URL}/home/post.php?user_id=${JSON.parse(user).id}`)
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
    font-size: 2em;
    vertical-align: middle;
    display: none;
}

.icon_hide {
    font-size: 2em;
    vertical-align: middle;
    display: none;
}

button p {
    display: block;
}

.image_in_post {
    min-width: 400px;
    min-height: 400px;
}

span {
    white-space: pre;
}

@media only screen and (orientation: portrait) {
    .icon {
        display: block;
    }

    .icon_show {
        display: block;
    }

    button p {
        display: none;
    }

    .icon_hide {
        display: block;
    }

    .image_in_post {
        min-width: 300px;
        min-height: 200px;
    }
}

.cncl_button {
    display: none;
}

.lblchr {
    float: left;
    margin-top: 1vh;
    width: fit-content;
}
</style>