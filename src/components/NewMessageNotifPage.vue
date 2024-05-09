<template>
    <button @click="hideNotif" class="main_bg main_color" id="msgNotif">
        
    </button>
</template>

<script>
    import $ from 'jquery'

    export default {
        name: "NewMessageNotifPage",
        methods: {
            hideNotif() {
                $(".notification-popup").hide()
            }
        }
    }
</script>

<style scoped>
    button {
        border: none;
        outline: none;
    }
</style>