<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import PostPage from '../components/PostPage.vue'
import EditPostPage from '@/components/EditPostPage.vue'
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