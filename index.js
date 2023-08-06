let globalUsers = [];
const SERVER_URL = 'https://jsonplaceholder.typicode.com';
init();

function init() {
  return getAllusers();
}

function getAllusers() {
  fetch(SERVER_URL +'/users/')
    .then((response) => {
      return response.json()
    })
    .then((users)=> {
      globalUsers = users;
      return showAllUsers(users)
    })
    .catch(error=> console.error('Error of getting users'))
    .finally(res=> console.log('finally'));
}

function showAllUsers(users) {
  const usersHtmlEl = document.getElementById('users');
  usersHtmlEl.innerHTML = users.map((user, index)=>{return getInfo(user, index)} ).join('');
}

function getInfo(user, index) {
  return `<div id='${user.id}'>
   ${(index+1)}
   ${user.name} |
   id:${user.id} | 
   email:${user.email} |
   <button onclick='getMoreInfo(event)'>more info</button> |
   <button onclick='deleteUser(event)'>delete</button> 
   </div> `;
}

function getMoreInfo(event) {
  const activatedButton = event.target;
  const userHtmlEl = activatedButton.parentElement;
  const userId = userHtmlEl.id;
  fetch(SERVER_URL +'/users/'+ userId)
    .then((response)=> { 
      return response.json()
  })
  .then(console.log)
  .catch(error=> {
    console.error('Error of getting more info about users')
  })
}

function deleteUser(event) {
  const activatedButton = event.target;
  const userHtmlEl = activatedButton.parentElement;
  const userId = userHtmlEl.id;
  fetch(SERVER_URL +'/users/' + userId , {
    method: 'DELETE',
  })
  .then((response)=> {
    globalUsers = globalUsers.filter((user)=> {return user.id !== Number(userId)});
    console.warn('user has been successfully deleted');
    showAllUsers(globalUsers);
  })
  .catch(error=> console.error('Error of deletting users'))
}