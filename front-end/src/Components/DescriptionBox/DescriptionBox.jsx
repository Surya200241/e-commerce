import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem illum ut voluptas rerum mollitia adipisci, ad sint expedita, sequi modi et eos, repellendus earum id.
             Fugiat iusto ratione recusandae quas.</p>
             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, doloremque laborum. Dignissimos, iste mollitia quo cumque quibusdam qui aut in ullam ea eaque ipsam dicta? 
                Cupiditate porro aperiam a repellendus?</p>
        </div>
         
    </div>
  )
}

export default DescriptionBox