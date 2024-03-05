import { useEffect, useRef, useState } from 'react'
import { Field } from './components'
import {
  emailValidator,
  passwordMinValidator,
  passwordSymbolValidator,
} from './validators'
import styles from './App.module.css'

const App = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passCheck, setPassCheck] = useState('')

  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isPassCheckValid, setIsPassCheckValid] = useState(false)

  const isFormValid = isEmailValid && isPasswordValid && isPassCheckValid

  const submitButtonRef = useRef(null)

  useEffect(() => {
    if (isFormValid) {
      submitButtonRef.current.focus()
    }
  }, [isFormValid])

  const onSubmit = (event) => {
    event.preventDefault()
    console.log({ email, password })
  }

  return (
    <div className={styles.app}>
      <form onSubmit={onSubmit}>
        <Field
          type="text"
          name="email"
          placeholder="Введите вашу почту"
          value={email}
          setValue={setEmail}
          setIsValid={setIsEmailValid}
          validators={[emailValidator]}
        />
        <Field
          type="password"
          name="password"
          placeholder="Введите ваш пароль"
          value={password}
          setValue={setPassword}
          setIsValid={setIsPasswordValid}
          validators={[passwordMinValidator, passwordSymbolValidator]}
        />
        <Field
          type="password"
          name="passCheck"
          placeholder="Повторите пароль"
          value={passCheck}
          setValue={setPassCheck}
          setIsValid={setIsPassCheckValid}
          validators={[(value) => (value === password ? null : 'Пароли не совпадают')]}
          dependencies={{ password }}
          forceValidation={(value) => {
            value.length > 0 && value.length >= password.length
          }}
        />
        <button type="submit" disabled={!isFormValid} ref={submitButtonRef}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}

export default App
