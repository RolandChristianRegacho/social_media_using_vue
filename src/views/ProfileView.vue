<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import ProfilePage from '../components/ProfilePage.vue'
import ProfilePostArea from '../components/ProfilePostArea.vue'
import ProfilePostsPage from '../components/ProfilePostsPage.vue'
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
    if ($(".settings_div").attr("data-status") == "show") {
        $(".settings_div").hide()
        $(".settings_div").attr("data-status", "hidden")
    }
    else {
        $(".settings_div").attr("data-status", "show")
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
    <nav @click="hideSearch()">
        <HeaderButtons />
    </nav>
    <main @click="hideSearch()" id="main">
        <div class="profile_form">
            <ProfilePage />
            <ProfilePostArea />
            <ProfilePostsPage />
        </div>
    </main>
</template>

<style scoped>
.profile_form {
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
}

main {
    float: left;
    text-align: center;
    margin-top: 60px;
    width: 100%;
    height: auto;
    max-width: 1200px;
}
</style>../components/ProfilePostsPage.vue