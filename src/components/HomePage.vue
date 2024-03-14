<template>
    <br>
    <div>
        <h1>Welcome to the homepage!</h1>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "HomePage",
    async mounted() {
        const result = await axios.get(`http://localhost:3000/user`)

        if (result.status == 200) {
            console.log("test")
        }
    }
}
</script>