var ENVIRONMENT = false
var URL = ''
var test = ''

if (ENVIRONMENT) {
  URL = 'http://192.168.4.200:81/social_media_api'
} else {
  URL = 'http://192.168.1.3/social_media_api'
}
console.log(test)

export default URL
