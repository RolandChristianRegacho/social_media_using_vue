<template>
    <div @click="hideZoom()" id="zoomImageDiv">
        <img id="zoomImageImd" src="" />
    </div>
</template>

<script>
import $ from "jquery"

    export default {
        name: "zoomImagePage",
        data() {
            return {
                image_source: ""
            }
        },
        methods: {
            hideZoom() {
                $("#zoomImageDiv").hide()
            }
        }
    }
</script>

<style scoped>
    #zoomImageDiv {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(50, 50, 50, 0.8);
        display: none;
        justify-content: center;
        align-items: center;
    }

    #zoomImageImd {
        width: auto;
        max-width: 1400px;
    }
</style>