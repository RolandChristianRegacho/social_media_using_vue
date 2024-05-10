<script setup>
import SignUpForm from '../components/SignUpForm.vue'
import $ from "jquery"
import calculateSize from '@/additional_scripts/calculate-width'

$(() => {
  calculateSize()
})
</script>

<template>
    <main>
        <SignUpForm />
    </main>
</template>

<style scoped>
main {
    margin-top: 100px;
    text-align: center;
}
</style>