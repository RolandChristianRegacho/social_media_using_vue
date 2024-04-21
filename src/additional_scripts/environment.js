var ENVIRONMENT = false
var URL = ''

if (ENVIRONMENT) {
  URL = 'http://192.168.4.200:81/social_media_api'
} else {
  URL = 'http://192.168.1.2/social_media_api'
}

export default URL
