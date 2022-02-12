import React from "react";

function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onClick}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.name} id={props.id} className="popup__form" onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__submit-button popup__submit-button_type_delete">{props.buttonText}</button>
        </form>
      <button type="button" className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm