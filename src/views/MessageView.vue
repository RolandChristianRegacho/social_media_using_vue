<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import MessageListArea from '../components/MessageListArea.vue'
import MessageNavArea from '../components/MessageNavArea.vue'
import MessagePage from '../components/MessagePage.vue'
import MessageFormArea from '../components/MessageFormArea.vue'
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