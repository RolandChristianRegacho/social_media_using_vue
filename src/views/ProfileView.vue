<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import ProfilePage from '../components/ProfilePage.vue'
import ProfilePostArea from '../components/ProfilePostArea.vue'
import ProfilePostsPage from '../components/ProfilePostsPage.vue'
import zoomImagePage from '@/components/zoomImagePage.vue'
import EditProfilePage from '../components/EditProfilePage.vue'
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