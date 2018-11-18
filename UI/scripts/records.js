let host = 'http://onlinestoremanager.herokuapp.com';

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  host = 'http://localhost:5008';
}

const loginPage = `${host}/login.html`;
const profileUrl = `${host}/api/v1/user`;
const salessUrl = `${host}/api/v1/sales`;
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

const getFormattedTime = (unixMillis) => {
  const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(parseInt(unixMillis));
  const year = (date.getFullYear());
  const month = months_arr[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  return `${month}-${day}-${year} ${hours}:${minutes.substr(-2)}`;
};
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
const gotoSale = (orderId) => {
  window.location.href = `./order-details.html?id=${orderId}`;
};
const populateSales = () => {
  fetch(salessUrl, {
    method: 'Get',
    headers: {
      'Content-type': 'application/json',
      Authorization: authHeader,
    },
  }).then(response => response.json())
    .then((data) => {
      if (data.message) {
        const ordersTable = document.getElementById('orders-table');
        const totalColumns = ordersTable.rows[0].cells.length;
        const columnCells = ['user_id', 'user_name', 'order_id', 'time_checked_out', 'order_quantity', 'order_price'];
        data.orders.forEach((item) => {
          const tr = document.createElement('TR');
          for (let i = 0; i < totalColumns; i += 1) {
            const td = document.createElement('TD');
            if (i === 3) {
              td.innerHTML = getFormattedTime(item[columnCells[i]]);
            } else {
              td.innerHTML = item[columnCells[i]];
            }
            tr.appendChild(td);
          }
          tr.addEventListener('click', () => { gotoSale(item.time_checked_out); });
          ordersTable.appendChild(tr);
        });
      } else {
        signout();
      }
    }).catch(e => console.log(e));
};


populateProfile();
populateSales();
