let host = 'http://onlinestoremanager.herokuapp.com';

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  host = 'http://localhost:5008';
}
const adminPage = `${host}/admin.html`;
const attendantPage = `${host}/attendant-dashboard.html`;
const loginPage = `${host}/login.html`;
const token = localStorage.getItem('Authorization');
const signupUrl = `${host}/api/v1/auth/signup`;

const signout = () => {
  localStorage.removeItem('Authorization');
  window.location.href = loginPage;
};
if (!token) {
  window.location.replace(loginPage);
}
const level = localStorage.getItem('Level');
if (level != 2) {
  window.location.replace(attendantPage);
}
const authHeader = `Bearer ${token}`;


const createAttendant = () => {
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const userInput = { email, name };
  document.getElementsByClassName('lds-hourglass')[0].style.display = 'inline';
  document.getElementsByClassName('pop-up')[0].style.display = 'none';
  fetch(signupUrl, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify(userInput),
  }).then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.message) {
        setTimeout(() => {
          window.location.href = adminPage;
        }, 300);
      } else {
        console.log(data.error);
        document.getElementsByClassName('lds-hourglass')[0].style.display = 'none';
        document.getElementsByClassName('pop-up')[0].style.display = 'block';
        document.getElementsByClassName('pop-up')[0].innerHTML = data.error;
      }
    }).catch((e) => {
      // console.log(e);
      document.getElementsByClassName('lds-hourglass')[0].style.display = 'none';
      document.getElementsByClassName('pop-up')[0].style.display = 'block';
      document.getElementsByClassName('pop-up')[0].innerHTML = 'Network Error';

      // console.log(e);
    });
  return false;
};
