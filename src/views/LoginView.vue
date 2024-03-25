<script setup>
import LoginForm from '../components/LoginForm.vue'
import $ from "jquery"

$(() => {
  if($(document).width() > 1200) {
    let document_width = $(document).width()

    let margin = document_width - 1200
    let margin_left = Math. round(margin / 2)

    $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray;`)
  }

  $(window).resize(function(){
    if($(document).width() > 1200) {
      let document_width = $(document).width()

      let margin = document_width - 1200
      let margin_left = Math. round(margin / 2)

      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray;`)
    }
    else {
      $("#main").attr("style", `margin-left: 0px; border-left: none; border-right: none;`)
    }
  });
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