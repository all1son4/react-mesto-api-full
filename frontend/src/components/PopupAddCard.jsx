import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard({ isOpen, onClose, buttonText, onOverlayClick, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  },[isOpen])

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm isOpen={isOpen}
                  onClose={onClose}
                  buttonText={buttonText}
                  onClick={onOverlayClick}
                  onSubmit={handleSubmit}
                  title="Новое место"
                  name="new-card"
                  id="form-card">
      <input
        type="text"
        id="name-card"
        name="name-picture"
        placeholder="Название"
        className="popup__field popup__field_type_card-name popup__input popup__input_type_name"
        value={name}
        onChange={handleChangeName}
        minLength="2"
        maxLength="30"
        required />
      <span id="name-card-error" className="error"></span>
      <input
        type="url"
        id="link" name="picture-url"
        placeholder="Ссылка на картинку"
        className="popup__field popup__field_type_card-src popup__input popup__input_type_url"
        value={link}
        onChange={handleChangeLink}
        minLength="2"
        required />
      <span id="link-error" className="error"></span>
    </PopupWithForm>
  )
}

export default PopupAddCard