<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import HomeInfoArea from '../components/HomeInfoArea.vue'
import HomePostArea from '../components/HomePostArea.vue'
//import HomeOthersArea from '../components/HomeOthersArea.vue'
import HomePage from '../components/HomePage.vue'
import zoomImagePage from '../components/zoomImagePage.vue'

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
  if ($(".menu_div").attr("data-status") == "show") {
    $(".menu_div").hide()
    $(".menu_div").attr("data-status", "hidden")
  }
  else {
    $(".menu_div").attr("data-status", "show")
  }
  $("#search_txt").val("")
}

$(() => {
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
  <zoomImagePage class="zoomImageDiv" />
  <nav @click="hideSearch()">
    <HeaderButtons />
  </nav>
  <main @click="hideSearch()" id="main">
    <HomeInfoArea />
    <div class="center_form">
      <HomePostArea class="user_information_area" />
      <HomePage />
    </div>
    <!--<HomeOthersArea />-->
  </main>
</template>

<style scoped>
.center_form {
  display: block;
  width: 50%;
  height: 100%;
  margin-left: 250px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
}

.zoomImageDiv {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(50, 50, 50, 0.8);
  display: none;
  justify-content: center;
  align-items: center;
}

main {
  float: left;
  text-align: center;
  margin-top: 60px;
  width: 100%;
  max-width: 1200px;
  overflow: auto;
}

@media only screen and (orientation: portrait) {
  .home_info_area {
    display: none;
  }

  .center_form {
    width: 100%;
    margin-left: 0;
  }
}
</style>