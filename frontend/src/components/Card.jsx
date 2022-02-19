import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = props.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : 'element__like-button_unactive'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleCardDelete() {
    props.onDeleteClick(props.card);
  }


  return (
      <div className="element">
        {props.id === currentUser._id && (<button type="button" className="element__remove-button" onClick={handleCardDelete}></button>)}
        <img className="element__image"  src={props.link} alt={props.name} onClick={handleClick}/>
        <div className="element__block">
          <h2 className="element__title">{props.name}</h2>
          <div className="element__like-block">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="element__like-counter">{props.likes.length}</p>
          </div>
        </div>
      </div>
    )
}

export default Card