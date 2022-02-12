import React from "react";

function InfoToolTip(props) {

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('popup')) {
      props.setIsOpen(false);
    }
  }

  const handleClose = React.useCallback(
    () => {
      props.setIsOpen(false);
      if(props.handleClose) props.handleClose();
    }, [props]
  )

  React.useEffect(() => {
    if (props.isOpen) {
      const handleEsc = (event) => {
        if (event.key === 'Escape' || 'Enter') {
          handleClose();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [props.isOpen, handleClose]);

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container popup__container_info">
        <img src={props.config.icon} alt="инфоиконка" className="popup__icon"/>
        <h2 className="popup__info">{props.config.info}</h2>
      <button type="button" className="popup__close-button" onClick={handleClose}></button>
      </div>
    </div>
  )
}

export default InfoToolTip