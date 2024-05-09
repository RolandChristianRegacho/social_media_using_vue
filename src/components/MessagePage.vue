<template>
  <div class="convo" v-if="receiver != ''">
    <div class="start_of_convo">
      <h3>Start of conversation</h3>
    </div>
    <div @click="readMessage()" v-for="item in messages" :key="item.id">
      <div class="speech" v-if="item.sender_id == owner">
        <div class="owner secondary_bg secondary_color">
          <div class="speech_content">
            {{ item.content }}
          </div>
          <div class="speech_time">
            {{ item.time }}
          </div>
        </div>
      </div>
      <div class="speech" v-else>
        <div class="receiver main_bg main_color">
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
import { getCookie } from "@/additional_scripts/cookie-handler"
import { getAxiosData, updateAxiosData } from "@/additional_scripts/fetch-script"
import logout from "@/additional_scripts/logout"
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
  methods: {
    readMessage() {
      console.log("asd")
    }
  },
  async mounted() {
    let user = getCookie("user")
    this.owner = JSON.parse(user).id

    if (user == "") {
      logout(this.$swal)  
    }

    var receiver_id = ""

    this.emitter.on("selectUser", (id) => {
      this.receiver = id
      receiver_id = id

      getMessages(this.BASE_URL, this.receiver, this.owner)
        .then(result => {
          $.when(this.messages = configureTime(result.data))
            .done(() => {
              $(".convo").animate({
                scrollTop: $(".convo").offset().top + $(".convo")[0].scrollHeight + 500000000000
              }, 500)

              let data = {
                "sender_id": id,
                "receiver_id": this.owner
              }

              readMessages(this.BASE_URL, data)
                .then(result => {
                  if (result.type == "success") {
                    this.emitter.emit("readMessage")
                  }
                  else {
                    this.$swal({
                      icon: result.type,
                      text: result.message,
                    })
                  }
                })
            })
        })
    })

    this.socket.onmessage = (event) => {
        var messageArray = JSON.parse(event.data)
        
        if(messageArray[1] == "message") {
          getMessages(this.BASE_URL, this.receiver, this.owner)
          .then(result => {
            $.when(this.messages = configureTime(result.data))
              .done(() => {
                if($(".convo").is(":visible")) {
                  $(".convo").animate({
                    scrollTop: $(".convo").offset().top + $(".convo")[0].scrollHeight + 500000000000
                  }, 500)

                  let data = {
                    "sender_id": receiver_id,
                    "receiver_id": this.owner
                  }
                    console.log($(".convo").is(":visible"))
                    console.log(data)
                    console.log(receiver_id)

                  readMessages(this.BASE_URL, data)
                    .then(result => {
                      if (result.type == "success") {
                        this.emitter.emit("readMessage")
                      }
                      else {
                        this.$swal({
                          icon: result.type,
                          text: result.message,
                        })
                      }
                    })
                }
              })
          })
        }
    };

    setInterval(() => {
      this.messages = configureTime(this.messages)
    }, 5000);
  }
}

function configureTime(data) {
  let currentDate = new Date()
  let currentStamp = currentDate.getTime()

  for (let message in data) {
    let timeDifference = (Math.round(currentStamp / 1000)) - data[message].timestamp

    if (timeDifference < 60) {
      if (timeDifference == 1 || timeDifference == 0) {
        data[message].time = "a second ago"
      }
      else {
        data[message].time = `${timeDifference} seconds ago`
      }
    }
    else if (timeDifference >= 60 && timeDifference < 3600) {
      let minute = Math.round(timeDifference / 60)

      if (minute == 1) {
        data[message].time = "a minute ago"
      }
      else {
        data[message].time = `${minute} minutes ago`
      }
    }
    else if (timeDifference >= 3600 && timeDifference < 46800) {
      let hour = Math.round(Math.round(timeDifference / 60) / 60)

      if (hour == 1) {
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

function getMessages(url, receiver, owner) {
  return getAxiosData(`${url}/home/messages.php?user_id=${owner}&message_user_id=${receiver}`)
}

function readMessages(url, data) {
  return updateAxiosData(`${url}/home/messages.php`, data)
}
</script>

<style scoped>
.convo {
  float: left;
  width: 100%;
  height: 80%;
  overflow: auto;
  -ms-overflow-style: none;
  /* IE and Edge */
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
  max-width: 90%;
  height: 100%;
  min-height: 80px;
  margin-right: 50px;
  border-radius: 8px;
  box-shadow: 3px 0px 5px 3px rgba(20, 20, 20, 1);
  margin-bottom: 10px;
}

.receiver {
  float: left;
  width: auto;
  min-width: 100px;
  max-width: 90%;
  height: 100%;
  min-height: 80px;
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

@media only screen and (orientation: portrait) {
  .owner {
    margin-right: 20px;
  }

  .receiver {
    margin-left: 20px;
  }
}
</style>
