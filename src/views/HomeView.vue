<script setup>
import HeaderButtons from '../components/HeaderButtons.vue'
import HomeInfoArea from '../components/HomeInfoArea.vue'
import HomePostArea from '../components/HomePostArea.vue'
import HomePage from '../components/HomePage.vue'
</script>

<template>
  <nav>
    <HeaderButtons />
  </nav>
  <main>
    <HomeInfoArea />
    <HomePostArea />
    <HomePage />
  </main>
</template>