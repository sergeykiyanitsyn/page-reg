import { useRef, useState } from 'react'
import styles from './App.module.scss'

const sendFormData = (formData) => {
  console.log(formData)
}

const initialState = {
  email: '',
  password: '',
  repeatPassword: '',
}

const useStore = () => {
  const [state, setState] = useState(initialState)

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue })
    },
  }
}

export const App = () => {
  const { getState, updateState } = useStore()
  const [passwordError, setPasswordError] = useState(null)
  const [repeatPasswordError, setRepeatPasswordError] = useState(null)
  const [validationOK, setBalidationOK] = useState(false)

  const submitButtonRef = useRef(null)

  const { email, password, repeatPassword } = getState()

  const isEmptyFields = email === '' || password === '' || repeatPassword === ''

  if (
    validationOK === false &&
    !isEmptyFields &&
    passwordError === null &&
    repeatPasswordError === null &&
    password.length === repeatPassword.length
  ) {
    setBalidationOK(true)
    submitButtonRef.current.focus()
  }

  if (
    validationOK === true &&
    !isEmptyFields &&
    (passwordError !== null || repeatPasswordError !== null)
  ) {
    setBalidationOK(false)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    sendFormData(getState())
  }

  const onPasswordChange = (target) => {
    updateState('password', target.value)

    const newPassword = target.value

    if (newPassword !== '') {
      let error = null

      if (!/^[\w\-_]*$/.test(newPassword)) {
        error =
          'Пароль введен неверно. Допустимые символы: латиница, цифры, нижнее подчеркивание и тире'
      } else if (newPassword.length > 10) {
        error = 'Допустимое количество символов не больше 10 '
      }

      setPasswordError(error)
    }
  }

  const onBlurPassword = (target) => {
    const { repeatPassword } = getState()
    const newPassword = target.value

    if (repeatPassword !== '') {
      let error = null

      if (newPassword !== repeatPassword) {
        error = 'Пароли не совпадают'
      }

      setRepeatPasswordError(error)
    }
  }

  const onBlurRepeatPassword = (target) => {
    const { password } = getState()
    const newRepeatPassword = target.value

    if (newRepeatPassword !== '') {
      let error = null

      if (newRepeatPassword !== password) {
        error = 'Пароли не совпадают'
      }

      setRepeatPasswordError(error)
    }
  }

  return (
    <>
      <div className={styles.app}>
        <div> Скоро тут будет большое изображение</div>
        <form className={styles.registrationForm} onSubmit={onSubmit}>
          <input
            className={styles.formField}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            placeholder="Введите ваш email"
            onChange={({ target }) => {
              updateState('email', target.value)
            }}
          />
          <input
            className={styles.formField}
            name="password"
            autoComplete="new-password"
            type="password"
            value={password}
            placeholder="Введите пароль"
            onChange={({ target }) => {
              onPasswordChange(target)
            }}
            onBlur={({ target }) => {
              onBlurPassword(target)
            }}
          />
          {passwordError && <div className={styles.messageError}>{passwordError}</div>}

          <input
            className={styles.formField}
            name="repeatPassword"
            autoComplete="new-password"
            type="password"
            value={repeatPassword}
            placeholder="Повторите ваш пароль"
            onChange={({ target }) => {
              updateState('repeatPassword', target.value)
            }}
            onBlur={({ target }) => {
              onBlurRepeatPassword(target)
            }}
          />
          {repeatPasswordError && (
            <div className={styles.messageError}>{repeatPasswordError}</div>
          )}
          <button
            className={styles.formButton}
            type="submit"
            disabled={validationOK === false}
            ref={submitButtonRef}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  )
}
