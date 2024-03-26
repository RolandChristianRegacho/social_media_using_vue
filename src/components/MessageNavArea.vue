<template>
    <div class="convo_nav">
        <button class="convo_nav_back" @click="backToList">Back</button>
        <button class="convo_nav_name" disabled>{{ name }}</button>
    </div>
</template>

<script>
import $ from "jquery"
export default {
    name: "MessageNavArea",
    data() {
        return {
            name: ""
        }
    },
    mounted() {
        this.emitter.on("selectUserName", (name) => {
            this.name = name
        })
    },
    methods: {
        backToList() {
            $(".btnUserListActive").attr("disabled", false)
            $(".btnUserListActive").attr("class", "btnUserListInactive")
            $(".message_page_div").hide()
            $(".message_nav_div").hide()
            $(".message_form_div").hide()
            $(".message_list_div").show()
        }
    }
}
</script>

<style scoped>
.convo_nav {
    float: left;
    width: 69%;
    margin-left: 5px;
    height: 50px;
    background: rgba(78, 111, 118, 1);
}

.convo_nav_name {
    float: left;
    width: 100%;
    height: 100%;
    text-align: left;
    padding-left: 20px;
    background: inherit;
}

.convo_nav_back {
    float: left;
    width: 20%;
    height: 100%;
    text-align: center;
    background: inherit;
    display: none;
}

.convo_nav_back:hover {
    background: white;
    color: rgba(38, 71, 78, 1);
}

@media only screen and (orientation: portrait) {
    .convo_nav {
        width: 100%;
        margin-left: 0;
    }

    .convo_nav_name {
        width: 80%;
    }

    .convo_nav_back {
        display: block;
    }
}
</style>