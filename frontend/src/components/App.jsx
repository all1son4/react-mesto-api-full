import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupEditProfile from './PopupEditProfile.jsx';
import PopupAddCard from './PopupAddCard.jsx';
import PopupProfileAvatar from './PopupProfileAvatar.jsx';
import ImagePopup from './ImagePopup.jsx';
import PopupForDelete from './PopupForDelete.jsx';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardListContext } from '../contexts/CardListContext.js';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register.jsx';
import Login from './Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import * as auth from '../utils/auth.js'


function App() {

  const [isEditAvatarPopupOpen, setPopupEditAvatar] = React.useState(false);
  const [isEditProfilePopupOpen, setPopupEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setPopupAddPlace] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [isDeleteSubmitPopupOpen, setPopupDeleteSubmit] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deleteCard, setDeleteCard] = React.useState(null);
  const [userMail, setUserMail] = React.useState('')

  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    auth
      .getCurrentUserInfo()
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
        }
      })
      .catch(err => alert(`Ошибка полученя данных и авторизации: ${err}`))
  },[])

  React.useEffect(()=> {
    if (!loggedIn) return;

    api
      .getAppInfo()
      .then(([userInfoRes, cardListRes]) => {

        setCurrentUser(userInfoRes);
        setCards(cardListRes);
        setUserMail(userInfoRes.email)
        console.log('INFORMATION')
      })
      .catch(err => alert(`Ошибка полученя данных: ${err}`))
  }, [loggedIn])  

  React.useEffect(() => {
    if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard.isOpen || isDeleteSubmitPopupOpen) {
      function handleEsc(event) {
        if (event.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, selectedCard.isOpen, isDeleteSubmitPopupOpen]);

  function handleEditAvatarClick() {
    setPopupEditAvatar(true);
  }

  function handleEditProfileClick() {
    setPopupEditProfile(true);
  }

  function handleAddPlaceClick() {
    setPopupAddPlace(true);
  }

  function handleCardClick({ name, link, isOpen }) {
    setSelectedCard({ name, link, isOpen: !isOpen });
  }

  function handleDeleteClick(card) {
    setPopupDeleteSubmit(true);
    setDeleteCard(card)
  }

  function closeAllPopups() {
    setPopupEditAvatar(false);
    setPopupEditProfile(false);
    setPopupAddPlace(false);
    setSelectedCard({ isOpen: false });
    setPopupDeleteSubmit(false);
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleUpdateUser(props) {
    api
      .setUserInfoApi(props.name, props.description)
      .then(userInfoRes => {
        setCurrentUser({name: userInfoRes.name, about: userInfoRes.about, avatar: userInfoRes.avatar})
        closeAllPopups();
      })
      .catch(err => alert(`Ошибка полученя данных: ${err}`));
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatarApi(avatar)
      .then(userInfoRes => {
        setCurrentUser({name: userInfoRes.name, about: userInfoRes.about, avatar: userInfoRes.avatar})
        closeAllPopups();
      })
      .catch(err => alert(`Ошибка отправки данных: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          console.log('NEW', newCard)
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => alert(`Ошибка отправки данных: ${err}`));
    }
    else {
      api
        .unlikeCard(card._id)
        .then((newCard) => {
          console.log('NOT NEW', newCard)
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => alert(`Ошибка отправки данных: ${err}`));
    }

  }

  function handleCardDelete() {
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard._id ? c : ''));
        closeAllPopups();
      })
      .catch(err => alert(`Ошибка удаления данных: ${err}`));
  }

  function handleAddPlaceSubmit({name, link}) {
    api
      .addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
    .catch(err => alert(`Ошибка отправки данных: ${err}`));
  }

  const handleLogin = () => {
      setLoggedIn(true);
    console.log('LOGIN')
  }

  // const SetHeaderMail = () => {
  //     auth
  //         .getCurrentUserInfo()
  //         .then((res => {
  //           if (res) {
  //             setUserMail(res.email);
  //             console.log('SET EMAIL')
  //           }
  //         }))
  //         .catch(err => alert(`Ошибка полученя данных: ${err}`))
  //   }

  const handleLogout = (event) => {
    event.preventDefault()

    auth
        .logout()
        .then(() => {
          setLoggedIn(false);
          setUserMail('');
          navigate('/signin');
        })
        .catch(err => alert(`Ошибка попытки выхода: ${err}`))
  }

  console.log('PAGE RENDER', loggedIn)

  return (
    <div className="page__container">
      <Header loggedIn={loggedIn} onLogout={handleLogout} email={userMail}/>
      <Routes>
        <Route path="/signin" element={loggedIn ? <Navigate to='/' /> : <Login  onLogin={handleLogin}/>}>
        </Route>
        <Route path="/signup" element={<Register onClose={closeAllPopups}
                                                  onOverlayClick={handleOverlayClick}/>}>
        </Route>
        <Route exact path="/" element={
          <CurrentUserContext.Provider value={currentUser}>
          <CardListContext.Provider value={cards}>
          <ProtectedRoute loggedIn={loggedIn}
                          component={Main}
                          onEditAvatar={handleEditAvatarClick}
                          onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onCardClick={handleCardClick}
                          onDeleteClick={handleDeleteClick}
                          onCardLike={handleCardLike}/>
          </CardListContext.Provider>
          <Footer />
          <PopupProfileAvatar isOpen={isEditAvatarPopupOpen}
                              onClose={closeAllPopups}
                              onOverlayClick={handleOverlayClick}
                              onUpdateAvatar={handleUpdateAvatar}
                              buttonText="Сохранить"/>
          <PopupAddCard isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onOverlayClick={handleOverlayClick}
                        onAddPlace={handleAddPlaceSubmit}
                        buttonText="Создать"/>
          <PopupEditProfile isOpen={isEditProfilePopupOpen}
                            onOverlayClick={handleOverlayClick}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                            buttonText="Сохранить"/>
          <ImagePopup card={selectedCard}
                      onClose={closeAllPopups}
                      onOverlayClick={handleOverlayClick}/>
          <PopupForDelete isOpen={isDeleteSubmitPopupOpen}
                          onClose={closeAllPopups}
                          onOverlayClick={handleOverlayClick}
                          buttonText="Да"
                          onCardDelete={handleCardDelete}/>
        </CurrentUserContext.Provider>
        } />
        <Route path='*' element={<Navigate to='/' />}></Route>
      </Routes>
    </div>
  );
}

export default App;