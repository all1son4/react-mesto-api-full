import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupProfileAvatar({ isOpen, onClose, buttonText, onOverlayClick, onUpdateAvatar }) {

  const avatar = React.useRef(null)

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({avatar: avatar.current.value});
  }

  return (
    <PopupWithForm isOpen={isOpen}
                  onClose={onClose}
                  buttonText={buttonText}
                  onClick={onOverlayClick}
                  onSubmit={handleSubmit}
                  title="Обновить аватар"
                  name="avatar"
                  id="form-avatar">
      <input
        type="text"
        id="user-avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__field popup__field_type_profile-avatar popup__input"
        ref={avatar}
        minLength="2"
        required />
        <span id="user-avatar-error" className="error"></span>
    </PopupWithForm>
  )
}

export default PopupProfileAvatar