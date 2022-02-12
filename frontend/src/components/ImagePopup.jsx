import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.card.isOpen ? 'popup_opened' : ''}`} onClick={props.onOverlayClick}>
    <div className="popup__content">
      <img src={props.card.link} alt={props.card.name} className="popup__image" />
      <p className="popup__caption">{props.card.name}</p>
      <button type="button" className="popup__close-button" onClick={props.onClose}></button>
    </div>
  </div>
  )
}

export default ImagePopup