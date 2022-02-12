import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditProfile({ isOpen, onClose, buttonText, onOverlayClick, onUpdateUser }) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      description
    });
  }

  return (
    <PopupWithForm isOpen={isOpen}
                  onClose={onClose}
                  buttonText={buttonText}
                  onClick={onOverlayClick}
                  onSubmit={handleSubmit}
                  title="Редактировать профиль"
                  name="edit"
                  id="form-avatar">
      <input
        type="text"
        id="user-name"
        name="name"
        placeholder="Имя"
        className="popup__field popup__field_type_profile-name popup__input"
        value={name||``}
        onChange={handleChangeName}
        minLength="2"
        maxLength="40"
        required />
      <span id="user-name-error" className="error"></span>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Описание"
        className="popup__field popup__field_type_profile-description popup__input"
        value={description||``}
        onChange={handleChangeDescription}
        minLength="2"
        maxLength="200"
        required />
      <span id="description-error" className="error"></span>
    </PopupWithForm>
  )
}

export default PopupEditProfile