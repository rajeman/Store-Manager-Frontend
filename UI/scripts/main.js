const confirmButton = document.getElementById('confirm-button');
const cancelButton = document.getElementById('cancel-button');
const deleteButton = document.getElementById('delete-button');
const modifyButton = document.getElementById('modify-button');
const dialogBackgroundWindow = document.getElementById('dialog-background-window');
if(confirmButton){
  confirmButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
  };
}
if(cancelButton){
  cancelButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
  };
}
if(modifyButton){
  modifyButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
    window.location.href='./modify-product.html';
  };
}
if(deleteButton){
  deleteButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
  };
}

const displayDialog = ()=>{
 dialogBackgroundWindow.style.display = 'block';
};

const gotoProduct =()=>{
  window.location.href='./product-details.html';
};

const getOrderId =(event)=>{
 // alert(event.target.parentElement.getElementsByTagName('td')[0].innerHTML);
  window.location.href='./admin-record-details.html';
};

