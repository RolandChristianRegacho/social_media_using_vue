<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import HomeInfoArea from '../components/HomeInfoArea.vue'
import HomePostArea from '../components/HomePostArea.vue'
//import HomeOthersArea from '../components/HomeOthersArea.vue'
import HomePage from '../components/HomePage.vue'
import zoomImagePage from '../components/zoomImagePage.vue'
import EditPostPage from '@/components/EditPostPage.vue'

import $ from "jquery"
import { getAxiosData } from '@/additional_scripts/fetch-script'
import URL from '@/additional_scripts/environment'
import { getCookie } from '@/additional_scripts/cookie-handler'

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
  let user = getCookie("user")

  getAxiosData(`${URL}/home/theme.php?user_id=${JSON.parse(user).id}`)
  .then(result => {
    import(`../assets/color/${result.data.color_theme}.css`)
  })
})
</script>

<template>
  <zoomImagePage class="zoomImageDiv" />
  <EditPostPage class="editPostPageDiv"/>
  <nav @click="hideSearch()" class="main_bg">
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