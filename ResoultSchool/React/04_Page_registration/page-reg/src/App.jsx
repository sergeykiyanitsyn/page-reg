import { useRef, useState } from 'react'
import styles from './App.module.scss'
import { useStore } from './hooks/useStore'
import { errorsTexts } from './hooks/messageErrors'
import { useErrorsStore } from './hooks/useErrorsStore'

const sendFormData = (formData) => {
  console.log(formData)
}

const URL_SRC =
  'https://static.vecteezy.com/system/resources/previews/027/291/162/non_2x/spaceman-astronaut-no-background-applicable-to-any-context-great-for-print-on-demand-merchandise-free-png.png'

export const App = () => {
  const { getState, updateState } = useStore()
  const { getErrorsState, updatErrorseState } = useErrorsStore()
  const [validationOK, setBalidationOK] = useState(false)

  const submitButtonRef = useRef(null)

  const { emailError, passwordError, repeatPasswordError } = getErrorsState()
  const { email, password, repeatPassword } = getState()

  const isEmptyFields = email === '' || password === '' || repeatPassword === ''

  if (
    validationOK === false &&
    !isEmptyFields &&
    emailError === null &&
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
    (emailError === null || passwordError !== null || repeatPasswordError !== null)
  ) {
    setBalidationOK(false)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    sendFormData(getState())
  }

  const onEmailBlur = (target) => {
    const email = target.value

    if (email !== '') {
      let error = null

      if (!/^[\w]*@[a-z]*.[a-z]{2,3}$/.test(email)) {
        error = errorsTexts.emailValueError
      }

      updatErrorseState('emailError', error)
    }
  }

  const onPasswordChange = (target) => {
    updateState('password', target.value)
    const newPassword = target.value

    if (newPassword !== '') {
      let error = null

      if (!/^[\w\-_]*$/.test(newPassword)) {
        error = errorsTexts.passwordValueError
      } else if (newPassword.length > 10) {
        error = errorsTexts.passwordMaxLengthError
      }

      updatErrorseState('passwordError', error)
    }
  }

  const onBlurPassword = (target) => {
    const { repeatPassword } = getState()
    const newPassword = target.value

    if (repeatPassword !== '') {
      let error = null

      if (newPassword !== repeatPassword) {
        error = errorsTexts.passwordsNotMatches
      } else if (newPassword.length < 3) {
        error = errorsTexts.passwordMinLengthError
      }

      updatErrorseState('passwordError', error)
    }
  }

  const onBlurRepeatPassword = (target) => {
    const { password } = getState()
    const newRepeatPassword = target.value

    if (newRepeatPassword !== '') {
      let error = null

      if (newRepeatPassword !== password) {
        error = errorsTexts.passwordsNotMatches
      }

      updatErrorseState('repeatPasswordError', error)
    }
  }

  return (
    <>
      <div className={styles.app}>
        <div>
          <img className={styles.cosmo} src={URL_SRC} alt="whte_waves" />
        </div>
        <form className={styles.registrationForm} onSubmit={onSubmit}>
          <input
            className={styles.formField}
            name="email"
            type="text"
            autoComplete="email"
            value={email}
            placeholder="Введите ваш email"
            onChange={({ target }) => {
              updateState('email', target.value)
            }}
            onBlur={({ target }) => {
              onEmailBlur(target)
            }}
          />

          {emailError && <div className={styles.messageError}>{emailError}</div>}

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
