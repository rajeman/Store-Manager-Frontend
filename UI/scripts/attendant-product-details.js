let host = 'http://onlinestoremanager.herokuapp.com';

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  host = 'http://localhost:5008';
}
const adminPage = `${host}/admin.html`;
const attendantPage = `${host}/attendant-dashboard.html`;
const loginPage = `${host}/login.html`;
const profileUrl = `${host}/api/v1/user`;
const token = localStorage.getItem('Authorization');
const isPositiveInteger = s => /^\+?[1-9][\d]*$/.test(s);



const signout = () => {
  localStorage.removeItem('Authorization');
  window.location.href = loginPage;
};

const displayDialog = () => {
  const dialogBackgroundWindow = document.getElementById('dialog-background-window');
  dialogBackgroundWindow.style.display = 'block';
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
const productId = params.get('id');
const productUrl = `${host}/api/v1/products/${productId}`;
if (!productId) {
  window.location.replace(attendantPage);
}

let storeQuantity = -1;
let productName = '';
let productPrice = '';
const configureButtons = () => {
const dialogBackgroundWindow = document.getElementById('dialog-background-window');
const cancelButton = document.getElementById('cancel-button');

cancelButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
  };
const cartButton = document.getElementById('cart-button');
cartButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
    const productQuantity = document.getElementById('product-quantity').value;
    if(!(productQuantity && isPositiveInteger(productQuantity))){
      console.log('Quantity must be a whole number between 0 and 1000');
      return;
    }

    if(productQuantity > storeQuantity){
      console.log('Quantity too large');
      return;
    }
    let storedProductsJson = localStorage.getItem('stored-products');
    if(!storedProductsJson){
      storedProductsJson = '{}';
    }
    let isReplaced = false;
    const storedProducts = JSON.parse(storedProductsJson);
    /*if(storedProducts.[String(productId)){
      isReplaced = true;
    }*/
    const storedItem = {productId, productName, productPrice, productQuantity};
    const productIdString = String(productId);
    storedProducts[productIdString] = storedItem;
    localStorage.setItem('stored-products', JSON.stringify(storedProducts));
    //console.log(isReplaced);
    

  };
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
      storeQuantity = data.product[0].product_quantity;
      productName = data.product[0].product_name;
      productPrice = data.product[0].product_price;
      configureButtons();
      // document.getElementsByClassName('items-box')[0].appendChild(productItem);
    } else {
      // signout();
      // alert cannot find product
      window.location.replace(attendantPage);
    }
  }).catch(e => console.log(e));

populateProfile();
