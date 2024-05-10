<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import HomeInfoArea from '../components/HomeInfoArea.vue'
import HomePostArea from '../components/HomePostArea.vue'
//import HomeOthersArea from '../components/HomeOthersArea.vue'
import HomePage from '../components/HomePage.vue'
import zoomImagePage from '../components/zoomImagePage.vue'
import EditPostPage from '@/components/EditPostPage.vue'
import NewMessageNotifPage from '@/components/NewMessageNotifPage.vue'
import hideSearchForAll from '@/additional_scripts/hide-search'
import $ from "jquery"
import calculateSize from '@/additional_scripts/calculate-width'

function hideSearch() {
  hideSearchForAll()
}

$(() => {
  calculateSize()
})
</script>

<template>
  <zoomImagePage class="zoomImageDiv" />
  <EditPostPage class="editPostPageDiv"/>
  <NewMessageNotifPage class="notification-popup" />
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