export default ({ store, redirect }) => {
  if (localStorage.getItem('username')) {
    return redirect('/')
  }
}