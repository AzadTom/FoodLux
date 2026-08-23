import { cn } from '@/lib/utils';
import React from 'react'
import { createPortal } from 'react-dom';


function Model({closeModel,children,className=""}) {

  const DialogModel =  (
    <div onClick={closeModel} className={cn(className ? className :"modal-container")}>
      {/* <div className='modal' >
      {children}
      </div> */}
      {children}
    </div>
  ); 

  return createPortal(DialogModel,document.body);
  
}

export default Model