<template>
    <div class="post_form" v-if="owner == profile_id">
        <form @submit.prevent="submit">
            <textarea placeholder="Open up a discussion" id="post_text" @input="checkCharacter"
                v-model="message.text"></textarea>
            <label id="character">255</label>
            <button id="postBtn" disabled @click="postMessage()">Post</button>
        </form>
    </div>
</template>
<script>
import { postAxiosData } from "@/additional_scripts/fetch-script"
import $ from "jquery"
export default {
    name: "ProfilePostArea",
    data() {
        return {
            message: {
                text: "",
                user_id: "",
                date: ""
            },
            profile_id: "",
            owner: ""
        }
    },
    methods: {
        async postMessage() {
            try {
                let user = this.getCookie("user")

                if (user == "") {
                    this.$swal({
                        title: "Logging out",
                    })
                    this.$swal.showLoading()
                    setTimeout(() => {
                        this.$router.push({ name: "LoginPage" })
                        this.$swal.close()
                    }, 1000)
                }
                else {
                    this.message.id = JSON.parse(user).id
                }

                let data = {
                    "user_id": this.message.id,
                    "content": this.message.text
                }
                $("#post_text").val("")

                postAxiosData(`${this.BASE_URL}/home/post.php`, data)
                .then(result => {
                    if(result.type == "success") {
                        this.emitter.emit("onPostInProfile");
                        $("#postBtn").attr("disabled", true)
                        $("#character").html("255")
                    }
                    this.$swal({
                        icon: result.type,
                        title: result.message
                    })
                })
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
        }
    },
    mounted() {
        let user = this.getCookie("user")
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
    height: 200px;
    margin-top: 10px;
    color: rgba(235, 235, 235, 0.64);
    border-radius: 5px;
    box-shadow: 3px 7px 5px 3px rgba(20, 20, 20, 1);
}

.post_form textarea {
    width: 100%;
    height: 150px;
    border: none;
    border-bottom: 2px solid white;
    background: rgba(0, 0, 0, 0);
    color: rgba(235, 235, 235, 0.64);
    resize: none;
    margin: auto;
    font-size: 25px;
    outline: none;
    padding: 10px;
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

.post_form button:disabled:hover {
    background: rgba(38, 71, 78, 1);
}

.post_form label {
    float: left;
    font-size: 1.5em;
    padding-left: 10px;
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
</style>