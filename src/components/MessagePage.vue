<template>
    <div class="convo" v-if="receiver != ''">
        <div v-for="item in messages" :key="item.id">
            <div class="speech right" v-if="item.sender_id == owner">{{ item.content }}</div>
            <div class="speech left" v-else>{{ item.content }}</div>
        </div>
    </div>
    <div class="convo" v-else>
    </div>
</template>

<script>
import axios from "axios"
    export default {
        name: "MessagePage",
        data() {
            return {
                messages: [],
                owner: "",
                receiver: ""
            }
        },
        async mounted() {
            let user = getCookie("user")
            this.owner = JSON.parse(user).id

            if (user == "") {
                logout()
            }

            this.emitter.on("selectUser", (id) => {
                this.receiver = id
                
                getMessages(this.BASE_URL, this.receiver, this.owner)
                .then(result => {
                    this.messages = result.data.data
                })
            })
        }
    }

async function getMessages(url, receiver, owner) {
    const result = await axios.get(`${url}/home/messages.php?user_id=${owner}&message_user_id=${receiver}`)

    if(result.status == 200) {
        return result
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
    .convo {
        float: left;
        width: 100%;
        height: 100%;
    }

    /* (A) SPEECH BOX */
.speech {
  /* (A1) FONT & COLORS */
  font-size: 1.2em;
  color: #fff;

  /* (A2) DIMENSIONS */
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
}

/* (B) USE ::AFTER TO CREATE THE "CALLOUT" */
.speech::after {
  display: block; width: 0; content: "";
  border: 15px solid transparent;
}
 
/* (C) "CALLOUT" DIRECTIONS */
.speech.up::after {
  border-bottom-color: #a53d38;
  border-top: 0;
}
.speech.down::after {
  border-top-color: #a53d38;
  border-bottom: 0;
}
.speech.left::after {
  border-right-color: rgba(38, 71, 78, 1);
  border-left: 0;
}
.speech.right::after {
  border-left-color: white;
  border-right: 0;
}
.speech.right {
    margin-left: 30%;
    background: white;
    color: rgba(38, 71, 78, 1);
}
.speech.left {
    background: rgba(38, 71, 78, 1);
}

/* (D) POSITION THE CALLOUT */
.speech {
  position: relative;
  margin: 30px;
}
.speech::after { position: absolute; }
.speech.up::after {
  top: -15px; left: calc(50% - 15px);
}
.speech.down::after {
  bottom: -15px; left: calc(50% - 15px);
}
.speech.left::after {
  left: -15px; top: calc(50% - 15px);
}
.speech.right::after {
  right: -15px; top: calc(50% - 15px);
}

@media only screen and (orientation: portrait) {
    .speech.right {
        margin-left: 5%;
    }
}
</style>