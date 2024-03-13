<template>
    <div>
        <button @click="goHome" class="header_icon"></button>
        <router-link to="/">Social Crowd</router-link>
        <a @click="logout" href="#">Logout</a>
        <a class="a_name">{{ name }}</a>
    </div>
</template>

<script>
export default {
    name: "HeaderButton",
    data() {
        return {
            name: ""
        }
    },
    methods: {
        logout() {
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            this.$router.push({ name: "LoginPage" })
        },
        goHome() {
            this.$router.push({ name: "HomePage" })
        }
    },
    mounted() {
        let user = getCookie("user")
        this.name = JSON.parse(user)[0].first_name

        if (!user) {
            this.$router.push({ name: "LoginPage" });
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
</style>