<template>
    <div class="post_container main_color">
        <div v-for="item in posts" class="user_post post_bg" :key="item.posts">
            <div @click="goToProfile(item.user.id)" class="user_post_sender border_bottom_only_post">
                {{ item.user.first_name }} {{ item.user.last_name }}
            </div>
            <div class="user_post_content border_bottom_only_post">
                <p contenteditable="false" :id="'post-' + item.posts.id" >{{ item.posts.content }}</p>
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
                <form @submit.prevent="submit">
                    <input class="post_input" type="text" placeholder="Reply" :id="'rp-frm-' + item.posts.id" @input="checkReplyLength(item.posts.id)" />
                    <button class="post_button main_bg_wHover main_color"
                        @click="postReply(item.posts.id)" :id="'reply-btn-' + item.posts.id" disabled>Reply</button>
                </form>
            </div>
            <div class="user_post_right" v-if="item.user.id == this.owner">
                <button class="post_button_right main_bg_wHover main_color" @click="deletePost(item.posts.id)">
                    <AnTwotoneDelete class="icon" />
                    <p>Delete</p>
                </button>
                <button class="post_button_right main_bg_wHover main_color" @click="editPost(item.posts.id)">
                    <AnOutlinedEdit class="icon" />
                    <p>Edit</p>
                </button>
            </div>
            <div class="user_reply_post" :id="'reply-' + item.posts.id">
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
</template>

<script>
import $ from "jquery";
import { AnOutlinedEdit, AnTwotoneDelete } from "@kalimahapps/vue-icons";
import { deleteAxiosData, getAxiosData, postAxiosData } from "@/additional_scripts/fetch-script";
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
            owner: ""
        }
    },
    components: {
        AnOutlinedEdit,
        AnTwotoneDelete
    },
    async mounted() {
        let user = getCookie("user")
        this.owner = JSON.parse(user).id

        if (user == "") {
            logout(this.$swal)
        }

        let post_id = this.$router.currentRoute._value.params.id.split("=")[1]

        getPosts(this.BASE_URL, post_id, user)
            .then(result => {
                this.posts = result
            })

        this.emitter.on("onChangePost", (id) => {
            getPosts(this.BASE_URL, id, user)
                .then(result => {
                    this.posts = result
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
                        this.$swal("Reply sent!", {
                            icon: "success",
                        });
                        this.replies.reply = ""
                        getPosts(this.BASE_URL, post_id, user)
                            .then(result => {
                                this.posts = result
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
        goToProfile(id) {
            this.$router.push(`/profile=${id}`)
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

function getPosts(BASE_URL, id, user) {
    if (user == "") {
        logout(this.$swal)
    }

    return getAxiosData(`${BASE_URL}/home/post.php?post_id=${id}`)
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
</style>