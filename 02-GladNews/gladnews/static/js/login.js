
function toggleFeatures(loggedIn) {
  if (loggedIn){
    $('.authenticated').css({
      display: "block",
    })
    $('.anon-only').css({
      display: "none",
    })
  } else {
    $('.authenticated').css({
      display: "none",
    })
    $('.anon-only').css({
      display: "block"
    })
  }
}

document.getElementById('buttonLogin').addEventListener('click' , () => {
  signIn({
    Username: document.getElementById('username').value,
    Password: document.getElementById('password').value
  }).then(result => {
    console.log('Successful Login.')
    console.log(result)
    toggleFeatures(true)
    //Setting User Name
    set_username()
  }).catch(err => {
    alert('Login failed... !!!'+ err)
  })
})

document.getElementById('buttonLogout').addEventListener('click', () => {
  console.log('Logout commencing')
  signOut()
  toggleFeatures(false)
  console.log('Logout complete')
})

function set_username(){
myToken().then(token => {
  toggleFeatures(true)
  console.log('Found user token - turned on authenticated features.')
  return token
}).then (decodeUserInfo).then(user => {
  console.log(user)
  $('#current-user-name')[0].textContent = user.name
}).catch( err => {
  toggleFeatures(false)
  if ( err === 'No user found.' ){
    console.log('User not logged in - leaving login frame visible')
  }
  else {
    throw err
  }
})
}

set_username()
