let host = 'http://onlinestoremanager.herokuapp.com';

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  host = 'http://localhost:5008';
}
const adminPage = `${host}/admin.html`;
const loginPage = `${host}/login.html`;
const profileUrl = `${host}/api/v1/user`;
const token = localStorage.getItem('Authorization');
const signout = () => {
  localStorage.removeItem('Authorization');
  window.location.href = loginPage;
};
if (!token) {
  window.location.replace(loginPage);
}
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

const params = (new URL(document.location)).searchParams;
const productId = params.get("id");
const productUrl = `${host}/api/v1/products/${productId}`;
if(!productId){
  window.location.replace(adminPage);
}

fetch(productUrl, {
    method: 'Get',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader,
    },
  }).then(response => response.json())
    .then((data) => {
      if (data.message) {
          const productItem = document.getElementById('product');
          productItem.id = data.product[0].product_id;
          productItem.getElementsByClassName('quant-avail')[0].innerHTML = `${data.product[0].product_quantity} available`;
          productItem.getElementsByClassName('detailed-description')[0].innerHTML = data.product[0].product_name;
          productItem.getElementsByClassName('actual-price')[0].innerHTML = data.product[0].product_price;
          productItem.getElementsByClassName('min-invent')[0].innerHTML = `Minimum Inventory: ${data.product[0].minimum_inventory}`;
          productItem.style.display = 'block';
         // document.getElementsByClassName('items-box')[0].appendChild(productItem);
  
      } else {
          //signout();
          //alert cannot find product
           window.location.replace(adminPage);
      }
    }).catch(e => console.log(e));
populateProfile();

