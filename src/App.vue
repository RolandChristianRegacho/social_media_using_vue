<script setup>
import { RouterView } from 'vue-router'
import $ from "jquery"
import { getCookie } from './additional_scripts/cookie-handler';
import { getAxiosData } from './additional_scripts/fetch-script';
import URL from './additional_scripts/environment';

$(() => {
  let user = getCookie("user")
  
  if(user == "") {
    import(`./assets/color/default.css`)
  }
  else {
    getAxiosData(`${URL}/home/theme.php?user_id=${JSON.parse(user).id}`)
    .then(result => {
      import(`./assets/color/${result.data.color_theme}.css`)
    })
  }
})
</script>

<template>
  <RouterView />
</template>