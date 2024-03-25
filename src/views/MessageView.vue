<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import MessageListArea from '../components/MessageListArea.vue'
import MessagePage from '../components/MessagePage.vue'
import MessageFormArea from '../components/MessageFormArea.vue'
import $ from "jquery"

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
  $("#search_txt").val("")
}

$(() => {
  let value = $(document).height() - 60
  if($("#main").height() < value) {
    $("#main").height(value)
    $("#main").attr("style", `height: ${value}px !important;`)
  }

  if($(document).width() > 1200) {
    let document_width = $(document).width()

    let margin = document_width - 1200
    let margin_left = Math.round(margin / 2)

    if($("#main").height() < value) {
      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
    }
    else if($("#main").height() == value) {
      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
    }
    else {
      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray;`)
    }
  }

  $(window).resize(function(){
    if($(document).width() > 1200) {
      let document_width = $(document).width()

      let margin = document_width - 1200
      let margin_left = Math. round(margin / 2)

      if($("#main").height() < value) {
        $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
      }
      else if($("#main").height() == value) {
        $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
      }
      else {
        $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray;`)
      }
    }
    else {
      if($("#main").height() < value) {
        $("#main").attr("style", `margin-left: 0px; border-left: none; border-right: none; height: ${value}px;`)
      }
      else if($("#main").height() == value) {
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
  <nav @click="hideSearch()">
    <HeaderButtons />
  </nav>
  <main @click="hideSearch()" id="main">
      <MessageListArea class="message_list_div" />
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

.message_page_div {
  float: left;
  width: 70%;
  height: 79%;
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
}

@media only screen and (orientation: portrait) {
  .home_info_area {
    display: none;
  }

  .center_form {
    width: 80%;
    margin-left: 10%;
  }
}
</style>