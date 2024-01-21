import React from 'react'
import { createPortal } from 'react-dom';


function Model({closeModel,children}) {


  const DialogModel =  (
    <div onClick={closeModel} className='modal-container'>
      <div className='modal' >
      {children}
      </div>
    </div>
  ); 

  return createPortal(DialogModel,document.body);
  
}

export default Model