const confirmButton = document.getElementById('confirm-button');
const cancelButton = document.getElementById('cancel-button');
const dialogBackgroundWindow = document.getElementById('dialog-background-window');
confirmButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
  };
cancelButton.onclick = () => {
    dialogBackgroundWindow.style.display = 'none';
  };
  const displayDialog = ()=>{
     dialogBackgroundWindow.style.display = 'block';
  };

