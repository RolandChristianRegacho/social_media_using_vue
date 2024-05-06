<script setup>
import { RouterView } from 'vue-router'
import $ from "jquery"

$(() => {
  import(`./assets/color/default.css`)

  let value = $(document).height() - 60
  if ($("#main").height() < value) {
    $("#main").height(value)
    $("#main").attr("style", `height: ${value}px !important;`)
  }

  if ($(document).width() > 1200) {
    let document_width = $(document).width()

    let margin = document_width - 1200
    let margin_left = Math.round(margin / 2)

    if ($("#main").height() < value) {
      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
    }
    else if ($("#main").height() == value) {
      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
    }
    else {
      $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray;`)
    }
  }

  $(window).on('resize', () => {
    if ($(document).width() > 1200) {
      let document_width = $(document).width()

      let margin = document_width - 1200
      let margin_left = Math.round(margin / 2)

      if ($("#main").height() < value) {
        $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
      }
      else if ($("#main").height() == value) {
        $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray; height: ${value}px;`)
      }
      else {
        $("#main").attr("style", `margin-left: ${margin_left}px; border-left: 2px solid gray; border-right: 2px solid gray;`)
      }
    }
    else {
      if ($("#main").height() < value) {
        $("#main").attr("style", `margin-left: 0px; border-left: none; border-right: none; height: ${value}px;`)
      }
      else if ($("#main").height() == value) {
        $("#main").attr("style", `margin-left: 0px; border-left: none; border-right: none; height: ${value}px;`)
      }
      else {
        $("#main").attr("style", `margin-left: 0px; border-left: none; border-right: none;`)
      }
    }
  });
})
</script>

<template>
  <RouterView />
</template>