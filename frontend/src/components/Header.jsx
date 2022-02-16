import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import headerLogo from "../images/header__logo.svg"

function Header({loggedIn, onLogout, email}) {
  const navigate = useNavigate();
  const root = useLocation()

  const handleRegister = (event) => {
    event.preventDefault();

    navigate('/signup')
  }

  const handleLogin = (event) => {
    event.preventDefault();

    navigate('/signin')
  }

  return (
    <header className="header page__header">
      <img src={headerLogo} className="header__logo" alt="Логотип проекта" />
      <div className="header__info-block">
        {loggedIn ? (<p className="header__email">{email}</p>) : ''}
        {loggedIn ? (<button type="button" className="header__button" onClick={onLogout}>Выйти</button>)
                  : root.pathname === '/signin' ? (<button type="button" className="header__button" onClick={handleRegister}>Регистрация</button>)
                    : (<button type="button" className="header__button" onClick={handleLogin}>Войти</button>)}
      </div>
    </header>)
}

export default Header