<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import ProfilePage from '../components/ProfilePage.vue'
import ProfilePostArea from '../components/ProfilePostArea.vue'
import ProfilePostsPage from '../components/ProfilePostsPage.vue'
import zoomImagePage from '@/components/zoomImagePage.vue'
import EditProfilePage from '../components/EditProfilePage.vue'
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
  let user = getCookie("user")

  getAxiosData(`${URL}/home/theme.php?user_id=${JSON.parse(user).id}`)
  .then(result => {
    import(`../assets/color/${result.data.color_theme}.css`)
  })
})
</script>

<template>
    <EditProfilePage />
    <EditPostPage class="editPostPageDiv"/>
    <zoomImagePage class="zoomImageDiv" />
    <nav @click="hideSearch()" class="main_bg">
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
</style>