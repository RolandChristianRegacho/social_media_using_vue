<template>
    <div @click="hideDiv($event)" id="grayEditPg" class="secondary_color">
        <div class="post_container_edit main_bg main_color">
            <div class="post_form">
                <form @submit.prevent="submit">
                    <div class="border_white border_bottom_only_post">
                        <textarea class="inherit_bg main_color" placeholder="Open up a discussion" id="post_text_edit" v-model="posts.content" @input="checkCharacter"></textarea>
                        <div id="imgDivEdit">
                            <img id="pstImgEdit"/>
                        </div>
                    </div>
                    <label class="main_color" id="character_edit">255</label>
                    <input type="file" name="fileEdit" id="fileEdit" accept="image/*" @change="previewImageForEdit()" class="inputfile main_bg_wHover main_color border_none" />
                    <label for="fileEdit" class="main_bg_wHover main_color border_none">
                        <AnOutlinedCloudUpload class="icon" />
                    </label>
                    <button id="postBtnEdit" class="main_bg_wHover main_color border_none" disabled @click="editPost(posts.id)">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { AnOutlinedCloudUpload } from "@kalimahapps/vue-icons";
import { getAxiosData, updateAxiosData } from '@/additional_scripts/fetch-script';
import logout from '@/additional_scripts/logout';
import $ from 'jquery';
export default {
    name: "EditPostPage",
    data() {
        return {
            posts: "",
            owner: ""
        }
    },
    components: {
        AnOutlinedCloudUpload
    },
    methods: {
        hideDiv(event) {
            if (event.target.nodeName == "BUTTON" || event.target.nodeName == "LABEL" || event.target.nodeName == "INPUT" || event.target.nodeName == "svg" || event.target.nodeName == "path" || event.target.nodeName == "TEXTAREA") {
                return
            }
            $("#grayEditPg").hide()
        },
        checkCharacter() {
            if (this.posts.content.length > 0) {
                if (this.posts.content.length > 255) {
                    let remaining_char = 255
                    $("#postBtnEdit").attr("disabled", true)
                    remaining_char -= this.message.text.length
                    $("#character_edit").html(remaining_char)
                    $("#character_edit").attr("style", "color: red;")
                }
                else {
                    let remaining_char = 255
                    $("#postBtnEdit").attr("disabled", false)
                    remaining_char -= this.posts.content.length
                    $("#character_edit").html(remaining_char)
                    $("#character_edit").attr("style", "color: rgba(235, 235, 235, 0.64);")
                }
                let element = document.getElementById("post_text_edit")
                element.style.height = "320px";
                element.style.height = (element.scrollHeight) + "px";
            }
            else {
                $("#postBtnEdit").attr("disabled", true)
                $("#character_edit").html("255")
                $("#character_edit").attr("style", "color: rgba(235, 235, 235, 0.64);")
                let element = document.getElementById("post_text_edit")
                element.style.height = "320px";
            }
        },
        previewImageForEdit() {
            var reader = new FileReader();
            reader.onload = function () {
                $("#pstImgEdit").attr("src", reader.result)
                $("#postBtnEdit").attr("disabled", false)
                let element = document.getElementById("post_text_edit")
                element.style.height = "320px";
                element.style.height = (element.scrollHeight) + "px";
            };
            reader.readAsDataURL($("#fileEdit")[0].files[0])
        },
        editPost(id) {
            let data = {
                post_id: id,
                content: this.posts.content
            }

            updateAxiosData(`${this.BASE_URL}/home/post.php`, data)
            .then(result => {
                this.$swal({
                    icon: result.type,
                    text: result.text,
                })
                .then(() => {
                    switch(this.$router.currentRoute._value.name) {
                        case "HomePage": {
                            this.emitter.emit("onPost")
                            break
                        }
                        case "PostPage": {
                            //will fix this
                            //this.emitter.emit("onChangePost")
                            window.location.href = this.$router.currentRoute._value.fullPath
                            break
                        }
                        case "ProfilePage": {
                            this.emitter.emit("onPostInProfile")
                            break
                        }
                    }
                })
                $("#grayEditPg").hide()
            })
        }
    },
    async mounted() {
        let user = this.getCookie("user")
        this.owner = JSON.parse(user).id

        if (user == "") {
            logout(this.$swal)
        }

        $("#post_text_edit").focus()
        
        this.emitter.on("onEditPost", (id) => {
            getPosts(this.BASE_URL, id, user)
                .then(result => {
                    this.posts = result.post

                    let remaining_char = 255 - result.post.content.length

                    $("#character_edit").html(remaining_char)

                    if(remaining_char < 255) {
                        //$("#postBtnEdit").attr("disabled", false)
                        $("#pstImgEdit").attr("src", result.post.image)
                    }
                })
        })
    }
}

function getPosts(BASE_URL, id, user) {
    if (user == "") {
        logout(this.$swal)
    }

    return getAxiosData(`${BASE_URL}/home/post.php?edit_id=${id}`)
}
</script>

<style scoped>
#grayEditPg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(50, 50, 50, 0.8);
    display: none;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.post_form textarea {
    width: 100%;
    min-height: 320px;
    border: none;
    resize: none;
    margin: auto;
    font-size: 25px;
    outline: none;
    padding: 10px;
    overflow: hidden;
}

.border_white {
    width: 99%;
    min-height: 150px;
    height: auto;
    border: none;
}

.post_form button {
    float: right;
    width: auto;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: 10px;
    height: 35px;
}

.post_form button:disabled {
    color: gray;
    cursor: not-allowed;
}

.post_form label {
    float: left;
    font-size: 1.5em;
    padding-left: 10px;
}

.post_form input[type="file"] {
    float: left;
    width: 100px;
    margin-left: 20px;
}

.post_form img {
    max-width: 600px;
    max-height: 400px;
    margin: auto;
}

#postBtnEdit {
    margin-top: 5px;
}

.inputfile {
    margin-top: 5px;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}


.inputfile+label {
    margin-top: 5px;
    margin-left: 10px;
    display: inline-block;
    cursor: pointer;
    height: 35px;
    text-align: center;
    padding: 10px;
    padding-top: 0;
}

.icon {
    font-size: 1.5em;
}

.image_in_post {
    min-width: 400px;
    min-height: 400px;
}

label {
    float: left;
    font-size: 1.5em;
    padding-left: 10px;
}
</style>