function GoToErrorPage(code) {
    console.log(code)
    window.location.href = `/${code}`
}

export default GoToErrorPage