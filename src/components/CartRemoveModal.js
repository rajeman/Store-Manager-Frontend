import React from 'react';

export default (props) => (
  <div id="dialog-background-window">
    <div id="dialog-box">
      <div id="content-header">Are you sure you want to remove product from cart?</div>
      <div className="options-button">
        <input id="delete-button" className="delete" type="button" value="Delete" onClick={
          props.handleRemoveItem}></input>
        {<input id="cancel-button" className="cancel" type="button" value="Cancel" onClick={
          props.handleCancel} ></input>}
      </div>
    </div>
  </div>
)
