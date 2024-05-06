<script setup>
import { getAxiosData } from '@/additional_scripts/fetch-script';
import HeaderButtons from '../components/HeaderButtons.vue'
import PostPage from '../components/PostPage.vue'
import $ from "jquery"
import URL from '@/additional_scripts/environment';
import EditPostPage from '@/components/EditPostPage.vue'
import { getCookie } from '@/additional_scripts/cookie-handler';

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
    <EditPostPage class="editPostPageDiv"/>
    <nav @click="hideSearch()" class="main_bg">
        <HeaderButtons />
    </nav>
    <main @click="hideSearch()" id="main">
        <div class="center_form_post">
            <PostPage />
        </div>
    </main>
</template>

<style scoped>
.center_form_post {
    display: inline-block;
    margin-left: 10%;
    width: 80%;
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