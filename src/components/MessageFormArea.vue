<template>
    <div class="message_form">
        <form @submit.prevent="submit">
            <textarea placeholder="Message" id="post_text" @input="checkCharacter"
                v-model="message.text"></textarea>
            <button id="postBtn" disabled @click="postMessage()"><AnOutlinedSend class="icon" /></button>
            <label id="character">255</label>
        </form>
    </div>
</template>

<script>
import { AnOutlinedSend } from "@kalimahapps/vue-icons";
import $ from "jquery"
    export default {
        name: "MessageFormArea",
        components: {
            AnOutlinedSend
        },
        data() {
            return {
                message: {
                    text: "",
                    user_id: "",
                    receiver_id: "",
                    date: ""
                }
            }
        },
        methods: {
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
            postMessage() {
                console.log(this.message.text)
            }
        }
    }
</script>

<style scoped>
.icon {
    color: white;
    font-size: 2em;
    vertical-align: middle;
}

.message_form {
    float: left;
    width: 50%;
    margin-left: 2%;
    height: 100%;
    margin: 0;
    color: rgba(235, 235, 235, 0.64);
}

.message_form textarea {
    float: left;
    width: 75%;
    height: 130px;
    border: none;
    border: 2px solid white;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0);
    color: rgba(235, 235, 235, 0.64);
    resize: none;
    font-size: 25px;
    outline: none;
    margin-left: 5%;
    margin-top: 10px;
}

.message_form button {
    float: left;
    width: 100px;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: 10px;
    height: 55px;
    margin-left: 20px;
    margin-top: 10px;
}

.message_form button:disabled {
    color: gray !important;
    cursor: not-allowed;
}

.message_form button:disabled:hover {
    background: rgba(38, 71, 78, 1);
}

.message_form label {
    float: left;
    font-size: 1.5em;
    padding-left: 10px;
    margin-left: 20px;
    margin-top: 10px;
}
</style>