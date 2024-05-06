<script setup>
import LoginForm from '../components/LoginForm.vue'
import $ from "jquery"
import calculateSize from '@/additional_scripts/calculate-width'

$(() => {
  calculateSize()
})
</script>

<template>
    <main>
        <LoginForm />
    </main>
</template>

<style scoped>
main {
    margin-top: 100px;
    text-align: center;
}
</style>