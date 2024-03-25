<template>
    <div class="post_form">
        <form @submit.prevent="submit">
            <textarea placeholder="Open up a discussion" id="post_text" @input="checkCharacter"
                v-model="message.text"></textarea>
            <label id="character">255</label>
            <button id="postBtn" disabled @click="postMessage()">Post</button>
        </form>
    </div>
</template>
<script>
import axios from "axios"
import $ from "jquery"
export default {
    name: "HomePostArea",
    data() {
        return {
            message: {
                text: "",
                user_id: "",
                date: ""
            }
        }
    },
    methods: {
        async postMessage() {
            try {
                let user = getCookie("user")

                if (user == "") {
                    this.$router.push({ name: "LoginPage" });
                }
                else {
                    this.message.id = JSON.parse(user).id
                }

                let data = {
                    "user_id": this.message.id,
                    "content": this.message.text
                }
                $("#post_text").val("")

                const result = await axios.post(`${this.BASE_URL}/home/post.php`, data)

                if (result.status == 200) {
                    this.emitter.emit("onPost");
                    $("#postBtn").attr("disabled", true)
                    $("#character").html("255")
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
                    $("#character").attr("style", "color: red;")
                }
                else {
                    let remaining_char = 255
                    $("#postBtn").attr("disabled", false)
                    remaining_char -= this.message.text.length
                    $("#character").html(remaining_char)
                    $("#character").attr("style", "color: rgba(235, 235, 235, 0.64);")
                }
            }
            else {
                $("#postBtn").attr("disabled", true)
                $("#character").html("255")
                $("#character").attr("style", "color: rgba(235, 235, 235, 0.64);")
            }
        }
    }
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
</style>