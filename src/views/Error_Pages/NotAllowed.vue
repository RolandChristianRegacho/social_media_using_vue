<template>
    <main>
        <div class = "error_div">
            <h1 class = "error_code" id = "error_code">405</h1>
            <h3 class = "error_text" id = "error_text">The method you are requesting is invalid!</h3>
        </div>
    </main>
</template>

<style scoped>

.error_div {
    float: left;
    height: 40vh;
    width: 40vw;
    margin-top: 5vh;
    margin-left: 30vw;
    text-align: center;
    color: white;
}

.error_div h1 {
    font-size: 8em;
}

.error_div h3 {
    font-size: 2em;
}

</style>