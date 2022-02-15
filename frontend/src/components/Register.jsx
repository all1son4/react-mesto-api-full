import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js'
import compliteIcon from "../images/complite_icon.svg"
import InfoToolTip from "./InfoToolTip.jsx";
import failIcon from "../images/fail_icon.svg";


function Register({onClose, onOverlayClick}) {

  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [infoToolTipIsOpen, setInfoToolTipIsOpen ] = React.useState(false)
  const [config, setConfig] = React.useState({
    info: '',
    icon: '',
    status: ''
  })

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues(v => ({
      ...v,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    auth
        .register(values)
        .then((res) => {
          if (res.statusCode !== 400) {
            setConfig({
              info: 'Вы успешно зарегистрировались!',
              icon: compliteIcon,
              status: 'complite'
            });
            setInfoToolTipIsOpen(true);
          }
          else {
            setConfig({
              info: 'Что-то пошло не так! Попробуйте ещё раз.',
              icon: failIcon,
              status: 'fail'
            });
            setInfoToolTipIsOpen(true);
          }
        })
        .catch(() => {
          setConfig({
            info: 'Что-то пошло не так! Попробуйте ещё раз.',
            icon: failIcon,
            status: 'fail'
          });
          setInfoToolTipIsOpen(true);
        });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="register-mail"
        name="email"
        value={values.email || ``}
        onChange={handleChange}
        placeholder="Email"
        className="auth__field"
        minLength="2"
        maxLength="30"
        required />
        <input
        type="password"
        id="register-pass"
        name="password"
        value={values.password || ``}
        onChange={handleChange}
        placeholder="Пароль"
        className="auth__field"
        minLength="2"
        maxLength="30"
        required />
        <button type="submit" className="auth__submit-button">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" target="_self" className="auth__login-link">Уже зарегистрированы? Войти</Link>
      <InfoToolTip isOpen={infoToolTipIsOpen}
                    onOverlayClick={onOverlayClick}
                    onClose={onClose}
                    name='infoToolTip'
                    handleClose={()=> {
                      if (config.status === 'complite')
                      navigate('/sign-in')
                      }}
                    config={config}
                    setIsOpen={setInfoToolTipIsOpen}
                    />
    </div>
  )
}

export default Register