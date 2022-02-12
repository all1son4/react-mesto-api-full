import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupForDelete({ isOpen, onClose, buttonText, onOverlayClick, onCardDelete }) {

  function handleSubmit(event) {
    event.preventDefault();

    onCardDelete();
  }

  return (
    <PopupWithForm isOpen={isOpen}
                  onClose={onClose}
                  buttonText={buttonText}
                  onClick={onOverlayClick}
                  title="Вы уверены?"
                  name="delete"
                  id="form-delete"
                  onSubmit={handleSubmit}>
    </PopupWithForm>
  )
}

export default PopupForDelete