<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import MessageListArea from '../components/MessageListArea.vue'
import MessageNavArea from '../components/MessageNavArea.vue'
import MessagePage from '../components/MessagePage.vue'
import MessageFormArea from '../components/MessageFormArea.vue'
import $ from "jquery"
import { getAxiosData } from '@/additional_scripts/fetch-script'
import URL from '@/additional_scripts/environment'

function hideSearch() {
  $(".search_div").hide()
  $(".search_div_not_found").hide()
  if ($(".notifications_div").attr("data-status") == "show") {
    $(".notifications_div").hide()
    $(".notifications_div_not_found").hide()
    $(".notifications_div").attr("data-status", "hidden")
  }
  else {
    $(".notifications_div").attr("data-status", "show")
  }
  if ($(".profile_div").attr("data-status") == "show") {
    $(".profile_div").hide()
    $(".profile_div").attr("data-status", "hidden")
  }
  else {
    $(".profile_div").attr("data-status", "show")
  }
  if ($(".menu_div").attr("data-status") == "show") {
    $(".menu_div").hide()
    $(".menu_div").attr("data-status", "hidden")
  }
  else {
    $(".menu_div").attr("data-status", "show")
  }
  $("#search_txt").val("")
}

function getUser(cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

$(() => {
  let user = getUser("user")

  getAxiosData(`${URL}/home/theme.php?user_id=${JSON.parse(user).id}`)
  .then(result => {
    import(`../assets/color/${result.data.color_theme}.css`)
  })


  let value = $(document).height() - 60
  if ($("#main").height() < value) {
    $("#main").height(value)
    $("#main").attr("style", `height: ${value}px !important;`)
  }

  if ($(document).width() > 1200) {
    let document_width = $(document).width()

    let margin = document_width - 1200
    let margin_left = Math.round(margin / 2)

    if ($("#main").height() < value) {
      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
    }
    else if ($("#main").height() == value) {
      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
    }
    else {
      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray;`)
    }
  }

  $(window).resize(function () {
    if ($(document).width() > 1200) {
      let document_width = $(document).width()

      let margin = document_width - 1200
      let margin_left = Math.round(margin / 2)

      if ($("#main").height() < value) {
        $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
      }
      else if ($("#main").height() == value) {
        $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
      }
      else {
        $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray;`)
      }
    }
    else {
      if ($("#main").height() < value) {
        $("#main").attr("style", `margin-left: 0px; border-left: none; border-right: none; height: ${value}px;`)
      }
      else if ($("#main").height() == value) {
        $("#main").attr("style", `margin-left: 0px; border-left: none; border-right: none; height: ${value}px;`)
      }
      else {
        $("#main").attr("style", `margin-left: 0px; border-left: none; border-right: none;`)
      }
    }
  });
})
</script>

<template>
  <nav @click="hideSearch()" class="main_bg">
    <HeaderButtons />
  </nav>
  <main @click="hideSearch()" id="main">
    <MessageListArea class="message_list_div" />
    <MessageNavArea class="message_nav_div" />
    <MessagePage class="message_page_div" />
    <MessageFormArea class="message_form_div" />
  </main>
</template>

<style scoped>
.message_list_div {
  float: left;
  width: 30%;
  height: 100%;
  border-right: 2px solid gray;
}

.message_nav_div {
  float: left;
  box-shadow: 3px 0px 5px 3px rgba(20, 20, 20, 1);
}

.message_page_div {
  float: left;
  width: 70%;
  height: 74%;
  border-bottom: 2px solid gray;
}

.message_form_div {
  float: left;
  width: 70%;
  height: 20%;
}

main {
  float: left;
  text-align: center;
  margin-top: 60px;
  width: 100%;
  max-width: 1200px;
  min-height: 800px;
  overflow-y: hidden;
}

@media only screen and (orientation: portrait) {
  .home_info_area {
    display: none;
  }

  .center_form {
    width: 80%;
    margin-left: 10%;
  }

  .message_list_div {
    width: 100%;
    height: auto;
    max-height: 600px;
    overflow: auto;
  }

  .message_nav_div {
    display: none;
  }

  .message_page_div {
    width: 100%;
    height: 50%;
    margin-left: 0;
    max-height: 400px;
  }

  .message_form_div {
    display: none;
    width: 100%;
    margin-left: 0;
  }
}
</style>