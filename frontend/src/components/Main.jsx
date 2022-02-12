import React from "react"
import Card from "./Card";
import { CardListContext } from "../contexts/CardListContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const {onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onDeleteClick, onCardLike} = props;
  const currentUser = React.useContext(CurrentUserContext)
  const cards = React.useContext(CardListContext)

  return (
    <main className="content">

      <section className="profile page__content">
        <div className="profile__container">
          <div className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})`}} onClick={onEditAvatar}>
            <div className="profile__overlay"></div>
          </div>
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements page__content">
        {cards.map((card) => {
          return (
            <Card name={card.name}
                  link={card.link}
                  likes={card.likes}
                  id={card.owner._id}
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                  onDeleteClick={onDeleteClick}
                  onCardLike={onCardLike}/>
          )
        })}
      </section>

    </main>
  )
}

export default Main