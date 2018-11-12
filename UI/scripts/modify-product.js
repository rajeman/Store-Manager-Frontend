let host = 'http://onlinestoremanager.herokuapp.com';

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  host = 'http://localhost:5008';
}
const adminPage = `${host}/admin.html`;
const attendantPage = `${host}/attendant-dashboard.html`;
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
const level = localStorage.getItem('Level');
if (level != 2) {
  window.location.replace(attendantPage);
}
const authHeader = `Bearer ${token}`;
const params = (new URL(document.location)).searchParams;
const productId = params.get('id');
const productUrl = `${host}/api/v1/products/${productId}`;
if (!productId) {
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
      document.getElementById('pname').value = data.product[0].product_name;
      document.getElementById('pquantity').value = data.product[0].product_quantity;
      document.getElementById('pinvent').value = data.product[0].minimum_inventory;
      document.getElementById('pprice').value = data.product[0].product_price;
    } else {
      // signout();
      // alert cannot find product
      window.location.replace(adminPage);
    }
  }).catch(e => console.log(e));

const doModify = () => {
  const productName = document.getElementById('pname').value;
  const productQuantity = document.getElementById('pquantity').value;
  const minimumInventory = document.getElementById('pinvent').value;
  const price = document.getElementById('pprice').value;
  const userInput = {
    productName, productQuantity, minimumInventory, price,
  };
  document.getElementsByClassName('lds-hourglass')[0].style.display = 'inline';
  document.getElementsByClassName('pop-up')[0].style.display = 'none';
  fetch(productUrl, {
    method: 'Put',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify(userInput),
  }).then(response => response.json())
    .then((data) => {
      // console.log(data);
      if (data.message) {
        setTimeout(() => {
          // reply with modify success
          window.location.href = `./product-details.html?id=${productId}`;
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

  return false;
};


