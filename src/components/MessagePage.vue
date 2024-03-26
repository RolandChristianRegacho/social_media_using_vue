<template>
  <div class="convo" v-if="receiver != ''">
    <div class="start_of_convo"><h3>Start of conversation</h3></div>
    <div v-for="item in messages" :key="item.id">
      <div class="speech" v-if="item.sender_id == owner">
        <div class="owner">
          <div class="speech_content">
            {{ item.content }}
          </div>
          <div class="speech_time">
            {{ item.time }}
          </div>
        </div>
      </div>
      <div class="speech" v-else>
        <div class="receiver">
          <div class="speech_content">
            {{ item.content }}
          </div>
          <div class="speech_time">
            {{ item.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="convo" v-else></div>
</template>

<script>
import axios from "axios"
import $ from "jquery"

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
                    $.when(this.messages = configureTime(result.data.data))
                    .done(() => {
                        $(".convo").animate({
                            scrollTop: $(".convo").offset().top + $(".convo")[0].scrollHeight + 500000000000
                        }, 500)

                        console.log($(".end_on_convo"))
                    })
                })
            })

            setInterval(() => {
                this.messages = configureTime(this.messages)
            }, 5000);
        }
    }

function configureTime(data) {
    let currentDate = new Date()
    let currentStamp = currentDate.getTime()

    for(let message in data) {
        let timeDifference = (Math.round(currentStamp/1000)) - data[message].timestamp

        if(timeDifference < 60) {
            if(timeDifference == 1 || timeDifference == 0) {
                data[message].time = "a second ago"
            }
            else {
                data[message].time = `${timeDifference} seconds ago`
            }
        }
        else if(timeDifference >= 60 && timeDifference < 3600) {
            let minute = Math.round(timeDifference / 60)

            if(minute == 1) {
                data[message].time = "a minute ago"
            }
            else {
                data[message].time = `${minute} minutes ago`
            }
        }
        else if(timeDifference >= 3600 && timeDifference < 46800) {
            let hour = Math.round(Math.round(timeDifference / 60) / 60)

            if(hour == 1) {
                data[message].time = "an hour ago"
            }
            else {
                data[message].time = `${hour} hours ago`
            }
        }
        else {
            data[message].time = data[message].date
        }
    }

    return data
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
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
}

.start_of_convo {
    float: left;
    width: 100%;
    height: 50px;
    padding: 10px;
}

.speech {
  float: left;
  width: 100%;
  height: auto;
  min-height: 50px;
  margin-top: 10px;
}

.owner {
  float: right;
  width: auto;
  min-width: 100px;
  height: 100%;
  min-height: 80px;
  background: white;
  color: rgba(38, 71, 78, 1);
  margin-right: 50px;
  border-radius: 8px;
  box-shadow: 3px 0px 5px 3px rgba(20, 20, 20, 1);
  margin-bottom: 10px;
}

.receiver {
  float: left;
  width: auto;
  min-width: 100px;
  height: 100%;
  min-height: 80px;
  background: rgba(38, 71, 78, 1);
  color: white;
  margin-left: 50px;
  border-radius: 8px;
  box-shadow: 3px 0px 5px 3px rgba(20, 20, 20, 1);
  margin-bottom: 10px;
}

.speech_content {
  float: left;
  text-align: left;
  width: 100%;
  height: auto;
  min-height: 60px;
  padding: 10px;
}

.speech_time {
  float: left;
  text-align: right;
  width: 100%;
  height: auto;
  min-height: 20px;
  font-size: 0.8em;
  padding: 10px;
}
</style>
