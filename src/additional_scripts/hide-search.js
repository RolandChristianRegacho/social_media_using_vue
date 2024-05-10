import $ from "jquery"

export default function hideSearchForAll() {
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