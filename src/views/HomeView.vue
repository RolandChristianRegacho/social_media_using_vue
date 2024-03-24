<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import HomeInfoArea from '../components/HomeInfoArea.vue'
import HomePostArea from '../components/HomePostArea.vue'
//import HomeOthersArea from '../components/HomeOthersArea.vue'
import HomePage from '../components/HomePage.vue'
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
</script>

<template>
  <nav @click="hideSearch()">
    <HeaderButtons />
  </nav>
  <main @click="hideSearch()">
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

main {
  float: left;
  text-align: center;
  margin-top: 60px;
  width: 100%;
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