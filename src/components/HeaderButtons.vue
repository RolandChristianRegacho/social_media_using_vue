<template>
    <div>
        <button @click="goHome" class="header_icon"></button>
        <router-link to="/">Social Crowd</router-link>
        <a>{{ name }}</a>
        <form @submit.prevent="submit">
            <input type="search" v-model="this.search.name" placeholder="Search a friend" />
            <button @click="searchPeople()" class="hiddenEnter">Search</button>
        </form>
        <a @click="logout" href="#" class="a_name">
            <CaLogout class="icon" />
        </a>
    </div>
</template>

<script>
import { CaLogout } from "@kalimahapps/vue-icons";
import axios from "axios";

export default {
    name: "HeaderButton",
    data() {
        return {
            name: "",
            search: {
                name: ""
            }
        }
    },
    components: {
        CaLogout
    },
    methods: {
        logout() {
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            this.$router.push({ name: "LoginPage" })
        },
        goHome() {
            this.$router.push({ name: "HomePage" })
        },
        async searchPeople() {
            const result = await axios.get(`${this.BASE_URL}/home/users.php?search=${this.search.name}`)

            if (result.status == 200) {
                if (result.data.type == "found") {
                    console.log(result.data)
                }
                else {
                    console.log("not found")
                }
            }
        }
    },
    mounted() {
        let user = getCookie("user")

        if (user == "") {
            this.$router.push({ name: "LoginPage" });
        }
        else {
            this.name = JSON.parse(user).first_name
        }
    }
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
</script>

<style scoped>
a {
    float: left;
    color: white;
    padding: 14px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 5px;
}

a:hover {
    background: rgb(52, 73, 94);
    color: white;
}

.a_name {
    float: right;
    margin-right: 0;
}

.a_name:hover {
    background: fixed;
}

.header_icon {
    background: url("@/assets/favicon.png");
    background-size: 100% 100%;
    height: 100%;
    width: 50px;
    height: 58px;
    font-size: 20px;
    float: left;
}

.icon {
    color: white;
    font-size: 2em;
    vertical-align: middle;
}

input[type="search"] {
    float: left;
    margin-left: 0 !important;
    margin-bottom: 0;
    margin-top: 10px;
    border-radius: 10px 10px 10px 10px;
    outline: none;
}

input[type="search"]:focus {
    font-size: 1.2em;
    transition-duration: 1s;
}

.hiddenEnter {
    display: none;
}
</style>