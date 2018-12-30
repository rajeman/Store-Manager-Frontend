import React from 'react';
//import Modal from 'react-modal';

export default (props) => (
    <div id="dialog-background-window">
    <div id="dialog-box">
        <div id="content-header">Are you sure you want to delete this product:</div>
        <div class="options-button">
            <input id="delete-button" className="delete" type="button" value="Delete"></input>
           { <input id="cancel-button" className="cancel" type="button" value="Cancel" onClick = {()=>{
               props.handleCancel();
           }} ></input> }
        </div>
    </div>
</div>
)




/* <Modal isOpen ={true}
onRequestClose
contentLabel = "Confirm Delete?"
id = "dialog-box"
>
<div id="content-header">Are you sure you want to delete this product:</div>
            <div className="options-button">
                <input id="delete-button" className="delete" type="button" value="Delete"></input>
                <input id="cancel-button" className="cancel" type="button" value="Cancel"></input>
            </div>
</Modal> */