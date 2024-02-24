// import { useStore } from './hooks/useStore'
import { useState } from 'react'
import styles from './App.module.scss'

const sendFormData = (formData) => {
  console.log(formData)
}

const initialState = {
  login: null,
  password: null,
  email: null,
}

const useStore = () => {
  const [state, setState] = useState(initialState)

  // const { login } = initialState

  // if (login !== null) {
  //   let error = null

  //   if (!/^[\w\-_]*$/.test(login)) {
  //     error =
  //       'Логин введен неверно. Допустимые символы: латиница, цифры, нижнее подчеркивание и тире'
  //   } else if (login.length > 10) {
  //     error = 'Допустимое количество символов не больше 10 '
  //   }

  //   setLoginError(error)
  // }

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue })
    },
  }
}

export const App = () => {
  const { getState, updateState } = useStore()

  const [loginError, setLoginError] = useState(null)

  // const onLoginBlur = () => {
  //   if (login.length < 3) {
  //     const errorMes = 'Неверный логин. Должно быть не меньше 3-х сиволов'
  //     setLoginError(errorMes)
  //   }
  // }

  const onSubmit = (event) => {
    event.preventDefault()
    sendFormData(getState())
  }

  const { email, login, password } = getState()

  return (
    <>
      <div className={styles.app}>
        <div> Большое изображение</div>
        <form className={styles.registrationForm} onSubmit={onSubmit}>
          {loginError && <div className={styles.messageError}>{loginError}</div>}
          <input
            className={styles.formField}
            id="login"
            name="login"
            type="text"
            value={login}
            placeholder="Введите логин"
            onChange={({ target }) => {
              updateState('login', target.value)
            }}
            // onBlur={onLoginBlur}
          />
          {/* <label htmlFor="login" className={styles.formLabel}>
            Введите логин
          </label> */}

          <input
            className={styles.formField}
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Введите пароль"
            onChange={({ target }) => {
              updateState('password', target.value)
            }}
            // onBlur={onLoginBlur}
          />
          {/* <label htmlFor="password" className={styles.formLabel}>
            Введите пароль
          </label> */}

          <input
            className={styles.formField}
            name="email"
            type="email"
            value={email}
            placeholder="Введите ваш email"
            onChange={({ target }) => {
              updateState('email', target.value)
            }}
            // onBlur={onLoginBlur}
          />
          <button
            className={styles.formButton}
            type="submit"
            disabled={loginError !== null}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  )
}
