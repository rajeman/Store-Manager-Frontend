const confirmButton = document.getElementById('confirm-button');
const cancelButton = document.getElementById('cancel-button');
const modifyButton = document.getElementById('modify-button');
// const dialogBackgroundWindow = document.getElementById('dialog-background-window');
if (confirmButton) {
  confirmButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
  };
}
if (cancelButton) {
  cancelButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
  };
}
if (modifyButton) {
  modifyButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
    window.location.href = './modify-product.html';
  };
}

const gotoProduct = () => {
  window.location.href = './product-details.html';
};

const gotoProductAttendant = () => {
  window.location.href = './attendant-product-details.html';
};

