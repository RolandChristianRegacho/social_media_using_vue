<template>
    <div class="message_form">
        <form @submit.prevent="submit">
            <textarea class="main_color" placeholder="Message" id="message_text" disabled @input="checkCharacter"
                v-model="message.text"></textarea>
            <button class="main_bg_wHover main_color main_border" id="postBtn" disabled @click="postMessage()">
                <AnOutlinedSend class="icon" />
            </button>
            <label class="main_color" id="character">255</label>
        </form>
    </div>
</template>

<script>
import { AnOutlinedSend } from "@kalimahapps/vue-icons";
import $ from "jquery"
import { postAxiosData } from "@/additional_scripts/fetch-script";
import logout from "@/additional_scripts/logout";
import { getCookie } from "@/additional_scripts/cookie-handler";


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
                receiver_id: ""
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
        },
        async postMessage() {
            let data = {
                "sender_id": this.message.user_id,
                "receiver_id": this.message.receiver_id,
                "content": this.message.text
            }

            postAxiosData(`${this.BASE_URL}/home/messages.php`, data)
                .then(result => {
                    if (result.type == "success") {
                        this.emitter.emit("selectUser", this.message.receiver_id)

                        this.message.text = ""
                    }
                })
            
            this.socket.send(JSON.stringify([this.message.receiver_id.toString(), "message"]));
        }
    },
    async mounted() {
        let user = getCookie("user")
        this.message.user_id = JSON.parse(user).id

        if (this.message.receiver_id != "") {
            $("#message_text").attr("disabled", false)
        }

        if (user == "") {
            logout(this.$swal)
        }

        this.emitter.on("selectUser", (id) => {
            this.message.receiver_id = id

            $("#message_text").attr("disabled", false)
        })
    }
}
</script>

<style scoped>
.icon {
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
    resize: none;
    font-size: 25px;
    outline: none;
    margin-left: 5%;
    margin-top: 10px;
    padding: 10px;
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

.message_form label {
    float: left;
    font-size: 1.5em;
    padding-left: 10px;
    margin-left: 20px;
    margin-top: 10px;
}

@media only screen and (orientation: portrait) {
    .message_form textarea {
        width: 70%;
        font-size: 20px;
    }

    .message_form button {
        width: 60px;
    }
}
</style>