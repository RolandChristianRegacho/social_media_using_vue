<template>
    <div class="post_form" v-if="owner == profile_id">
        <form @submit.prevent="submit">
            <div class="border_white border_bottom_only_post">
                <textarea class="inherit_bg main_color" placeholder="Open up a discussion" id="post_text" @input="checkCharacter"
                    v-model="message.text"></textarea>
                <div v-if="message.image != ''">
                    <img id="pstImg" @src=message.img />
                </div>
            </div>
            <label id="character">255</label>
            <input type="file" name="file" id="file" accept="image/*" @change="previewImage(this)" class="inputfile main_bg_wHover main_color border_none" />
            <label for="file" class="main_bg_wHover main_color border_none">
                <AnOutlinedCloudUpload class="icon" />
            </label>
            <button id="postBtn" class="main_bg_wHover main_color border_none" disabled @click="postMessage()">Post</button>
            <button id="cancelPst" class="main_bg_wHover main_color border_none" @click="cancelMessage()" v-if="message.text.length > 0">Cancel</button>
        </form>
    </div>
</template>
<script>
import { AnOutlinedCloudUpload } from "@kalimahapps/vue-icons";
import { postAxiosData, postImageData } from "@/additional_scripts/fetch-script"
import $ from "jquery"
import logout from "@/additional_scripts/logout";
import { getCookie } from "@/additional_scripts/cookie-handler";
export default {
    name: "ProfilePostArea",
    components: {
        AnOutlinedCloudUpload
    },
    data() {
        return {
            message: {
                text: "",
                user_id: "",
                date: "",
                image: ""
            },
            profile_id: "",
            owner: ""
        }
    },
    methods: {
        async postMessage() {
            try {
                let user = getCookie("user")

                if (user == "") {
                    logout(this.$swal)
                }
                else {
                    this.message.id = JSON.parse(user).id
                }

                let formData = {}

                if ($('#file')[0].files.length == 0) {
                    formData = {
                        "user_id": this.message.id,
                        "content": this.message.text
                    }

                    postAxiosData(`${this.BASE_URL}/home/post.php`, formData)
                        .then(result => {
                            if (result.type == "success") {
                                this.emitter.emit("onPostInProfile");
                                $("#postBtn").attr("disabled", true)
                                $("#character").html("255")
                                $("#post_text").val("")
                                $("#pstImg").attr("src", "")
                                this.message.text = ""
                            }
                            else {
                                this.$swal({
                                    icon: result.type,
                                    text: result.message,
                                })
                            }
                        })
                }
                else {
                    formData = new FormData()
                    formData.append('image_file', $('#file')[0].files[0]);
                    formData.append('user_id', this.message.id)
                    formData.append('content', this.message.text)

                    postImageData(`${this.BASE_URL}/home/upload.php`, formData)
                        .then(result => {
                            if (result.type == "success") {
                                this.emitter.emit("onPostInProfile");
                                $("#postBtn").attr("disabled", true)
                                $("#character").html("255")
                                $("#post_text").val("")
                                $("#pstImg").attr("src", "")
                                this.message.text = ""
                            }
                            else {
                                this.$swal({
                                    icon: result.type,
                                    text: result.message,
                                })
                            }
                        })
                }
            }
            catch (e) {
                console.log(e)
            }
        },
        checkCharacter() {
            if (this.message.text.length > 0) {
                if (this.message.text.length > 255) {
                    let remaining_char = 255
                    $("#postBtn").attr("disabled", true)
                    remaining_char -= this.message.text.length
                    $("#character").html(remaining_char)
                }
                else {
                    let remaining_char = 255
                    $("#postBtn").attr("disabled", false)
                    remaining_char -= this.message.text.length
                    $("#character").html(remaining_char)
                }
            }
            else {
                $("#postBtn").attr("disabled", true)
                $("#character").html("255")
            }
        },
        previewImage() {
            var reader = new FileReader();
            reader.onload = function () {
                $("#pstImg").attr("src", reader.result)
            };
            console.log("trigger")
            reader.readAsDataURL($("#file")[0].files[0])
            this.message.image = reader.result
        },
    },
    mounted() {
        let user = getCookie("user")

        if (user == "") {
            logout(this.$swal)
        }

        this.profile_id = this.$router.currentRoute._value.params.id.split("=")[1]
        this.owner = JSON.parse(user).id
    }
}
</script>

<style scoped>
.post_form {
    float: left;
    width: 96%;
    margin-left: 2%;
    min-height: 200px;
    height: auto;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 3px 7px 5px 3px rgba(20, 20, 20, 1);
}

.post_form textarea {
    width: 100%;
    min-height: 150px;
    height: auto;
    border: none;
    resize: none;
    margin: auto;
    font-size: 25px;
    outline: none;
    padding: 10px;
    overflow: hidden;
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

.border_white {
    width: 100%;
    min-height: 150px;
    height: auto;
    border: none;
}

.post_form input[type="file"] {
    float: left;
    width: 100px;
    margin-left: 20px;
}

.post_form img {
    max-width: 800px;
    max-height: 400px;
}

@media only screen and (orientation: portrait) {
    .post_form {
        height: 150px;
    }

    .post_form textarea {
        font-size: 1em;
        height: 100px;
    }

    .post_form label {
        font-size: 1em;
        padding: 10px;
    }
}

.inputfile {

    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}


.inputfile+label {
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
</style>