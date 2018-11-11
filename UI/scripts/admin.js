let host = 'http://onlinestoremanager.herokuapp.com';

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  host = 'http://localhost:5008';
}

const loginPage = `${host}/login.html`;
const profileUrl = `${host}/api/v1/user`;
const productsUrl = `${host}/api/v1/products`;
const token = localStorage.getItem('Authorization');
const signout = () => {
  localStorage.removeItem('Authorization');
  window.location.href = loginPage;
};
if (!token) {
  window.location.replace(loginPage);
}
const gotoProduct = (productId) => {
  window.location.href = `./product-details.html?id=${productId}`;
};
const authHeader = `Bearer ${token}`;
const populateProfile = () => {
  fetch(profileUrl, {
    method: 'Get',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader,
    },
  }).then(response => response.json())
    .then((data) => {
      if (data.message) {
        profileEmail = document.getElementById('email');
        profileEmail.innerHTML = data.userDetails.email;
        profileName = document.getElementById('username');
        profileName.innerHTML = data.userDetails.username;
        profileTitle = document.getElementById('level');
        if (data.userDetails.level === 2) {
          profileTitle.innerHTML = 'Admin';
        } else {
          profileTitle.innerHTML = 'Attendant';
        }
      } else {
        signout();
      }
    }).catch(e => console.log(e));
};

const populateProducts = () => {
  fetch(productsUrl, {
    method: 'Get',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader,
    },
  }).then(response => response.json())
    .then((data) => {
      if (data.message) {
        data.products.forEach((item) => {
          const productItem = document.getElementsByClassName('item')[0].cloneNode(true);
          productItem.id = item.product_id;
          productItem.getElementsByClassName('quant-avail')[0].innerHTML = `${item.product_quantity} available`;
          productItem.getElementsByClassName('name-description')[0].innerHTML = item.product_name;
          productItem.getElementsByClassName('actual-price')[0].innerHTML = item.product_price;
          productItem.addEventListener('click', ()=>{gotoProduct(productItem.id)});
          productItem.style.display = 'block';
          document.getElementsByClassName('items-box')[0].appendChild(productItem);
        });
      } else {
          signout();
      }
    }).catch(e => console.log(e));
};


populateProfile();
populateProducts();
