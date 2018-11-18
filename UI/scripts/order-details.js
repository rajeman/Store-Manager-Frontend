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
const orderId = params.get('id');

const orderUrl = `${host}/api/v1/sales/${orderId}`;
if (!orderId) {
  window.location.replace(adminPage);
}
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

fetch(orderUrl, {
  method: 'Get',
  headers: {
    'Content-type': 'application/json',
    Authorization: authHeader,
  },
}).then(response => response.json())
  .then((data) => {
    if (data.message) {
      const summaryTable = document.getElementById('orders-table');
      const summaryColumns = summaryTable.rows[0].cells.length;
      const summaryCells = ['user_id', 'user_name', 'order_id', 'time_checked_out', 'order_quantity', 'order_price'];
      const orderSummary = data.orderDetails[0];
      const tr = document.createElement('TR');

      for (let i = 0; i < summaryColumns; i += 1) {
        const td = document.createElement('TD');
        if (i === 3) {
          td.innerHTML = getFormattedTime(orderSummary[summaryCells[i]]);
        } else {
          td.innerHTML = orderSummary[summaryCells[i]];
        }
        tr.appendChild(td);
      }
      summaryTable.appendChild(tr);

      const detailsTable = document.getElementById('details-table');
      const detailsColumns = detailsTable.rows[0].cells.length;
      const detailsCells = ['product_id', 'product_name', 'product_quantity', 'product_price', 'total_price'];
      data.orderDetails.forEach((item) => {
        const tr = document.createElement('TR');
        for (let i = 0; i < detailsColumns; i += 1) {
          const td = document.createElement('TD');
          td.innerHTML = item[detailsCells[i]];
          tr.appendChild(td);
        }
        detailsTable.appendChild(tr);
      });


      /* data.orders.forEach((item) => {
          if(item.order)
          const tr = document.createElement('TR');
          for (let i = 0; i < totalColumns; i=i+1) {
            const td = document.createElement('TD');
            if(i === 3){
              td.innerHTML = getFormattedTime(item[columnCells[i]]);
            } else{
            td.innerHTML = item[columnCells[i]];
          }
            tr.appendChild(td);
          }
          tr.addEventListener('click', () => { gotoSale(item.order_id); });
          ordersTable.appendChild(tr);
        } */
    } else {
      // signout();
      // alert cannot find product
      // window.location.replace(adminPage);
      console.log(data.error);
    }
  }).catch(e => console.log(e));

populateProfile();
