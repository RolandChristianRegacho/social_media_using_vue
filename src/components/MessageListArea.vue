<template>
    <div class="user_list">
        <div v-for="item in users" :key="item.id" class="user_list_items">
            <button @click="selectUser(item.id)">{{ item.first_name }} {{ item.last_name }}</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageList",
        data() {
            return {
                users: [
                    {
                        id: "2",
                        first_name: "test",
                        last_name: "test",
                        profile_picture: "@assets/image.png"
                    },
                    {
                        id: "3",
                        first_name: "test2",
                        last_name: "test",
                        profile_picture: "@assets/image.png"
                    }
                ]
            }
        },
        methods: {
            selectUser(id) {
                this.emitter.emit("selectUser", id)
            }
        }
    }
</script>   

<style scoped>
    .user_list {
        float: left;
        width: 100%;
        height: 100%;
    }

    .user_list_items {
        float: left;
        width: 100%;
        height: 50px;
        border-bottom: 2px solid gray;
        margin-top: 10px;
    }

    .user_list_items button {
        float: left;
        width: 100%;
        height: 99%;
        background: inherit;
        border: none;
    }

    .user_list_items button:hover {
        background: rgb(52, 73, 94);
    }
</style>