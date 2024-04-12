export default function logout(swal) {
  document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  swal({
    title: 'Logging out'
  })
  swal.showLoading()
  setTimeout(() => {
    swal.close()
    window.location.href = '/login'
  }, 1000)
}
