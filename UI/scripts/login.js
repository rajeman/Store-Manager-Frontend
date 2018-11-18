let host = 'http://onlinestoremanager.herokuapp.com';

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  host = 'http://localhost:5008';
}
const adminPage = `${host}/admin.html`;
const attendantPage = `${host}/attendant-dashboard.html`;
const loginUrl = `${host}/api/v1/auth/login`;
const login = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userInput = { email, password };
  document.getElementsByClassName('lds-hourglass')[0].style.display = 'inline';
  document.getElementsByClassName('pop-up')[0].style.display = 'none';
	 fetch(loginUrl, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userInput),
  }).then(response => response.json())
    .then((data) => {
    	 // console.log(data);
      if (data.message) {
        localStorage.setItem('Authorization', data.token);
        localStorage.setItem('Level', data.level);
        setTimeout(() => {
          console.log(data.level);
          if (data.level === 2) {
            window.location.href = adminPage;
          } else if (data.level === 1) {
            window.location.replace(attendantPage);
          } else {
            window.location.replace(loginPage);
          }
        }, 300);
      } else {
        document.getElementsByClassName('lds-hourglass')[0].style.display = 'none';
        document.getElementsByClassName('pop-up')[0].style.display = 'block';
        document.getElementsByClassName('pop-up')[0].innerHTML = data.error;
      }
    }).catch((e) => {
      document.getElementsByClassName('lds-hourglass')[0].style.display = 'none';
      document.getElementsByClassName('pop-up')[0].style.display = 'block';
      document.getElementsByClassName('pop-up')[0].innerHTML = 'Network Error';

      console.log(e);
    });
};
