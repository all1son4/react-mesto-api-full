import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import InfoToolTip from "./InfoToolTip.jsx";
import failIcon from "../images/fail_icon.svg"


function Login({onLogin}) {

  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [infoToolTipIsOpen, setInfoToolTipIsOpen ] = React.useState(false)

  const config = {
    icon: failIcon,
    info: "Что-то пошло не так! Попробуйте ещё раз."
  }

  // const handleOverlayClick = (event) => {
  //   if (event.target.classList.contains('popup')) {
  //     setInfoToolTipIsOpen(false);
  //   }
  // }

  // const handleClose = () => {
  //   setInfoToolTipIsOpen(false)
  // }

  // React.useEffect(() => {
  //   if (infoToolTipIsOpen) {
  //     const handleEsc = (event) => {
  //       if (event.key === 'Escape') {
  //         handleClose();
  //       }
  //     }

  //     document.addEventListener('keydown', handleEsc);

  //     return () => {
  //       document.removeEventListener('keydown', handleEsc);
  //     }
  //   }
  // }, [infoToolTipIsOpen]);

  const handleChange = (event) => {
    const {name, value} = event.target;

    setValues(v => ({
      ...v,
      [name]: value,
    }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    auth
        .authorize(values)
        .then(res => {
          console.log(res)
          if (res.statusCode !== 400 || 401 ) {
            if (res.token) {
              setValues({
                email: '',
                password: ''
              })

              localStorage.setItem('token', res.token);
              console.log(localStorage.getItem('token'))
              onLogin();
              navigate('/')
            }
          else {
            setInfoToolTipIsOpen(true);
            }
          }
        })
        .catch(() => {
          setInfoToolTipIsOpen(true);
        });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="login-mail"
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
        id="login-pass"
        name="password"
        value={values.password || ``}
        onChange={handleChange}
        placeholder="Пароль"
        className="auth__field"
        minLength="2"
        maxLength="30"
        required />
        <button type="submit" className="auth__submit-button">Войти</button>
      </form>
      <InfoToolTip  isOpen={infoToolTipIsOpen}
                    name='infoToolTip'
                    config={config}
                    setIsOpen={setInfoToolTipIsOpen}
                    />
    </div>
  )
}

export default Login