import * as yup from 'yup'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './App.module.scss'

const errorsTexts = {
  emailValueError:
    'Email введен неверно. Email должен содержать символ @ и не иметь пробелов',
  passwordValueError:
    'Пароль введен неверно. Допустимые символы: латиница, цифры, нижнее подчеркивание и тире',
  passwordMaxLengthError: 'Допустимое количество символов не больше 10',
  passwordsNotMatches: 'Пароли не совпадают',
  passwordMinLengthError: 'Пароль должен быть не меньше 3-х сиволов',
}

export const App = () => {
  const fieldsScheme = yup.object().shape({
    email: yup.string().matches(/^[\w]*@[a-z]*.[a-z]{2,3}$/, errorsTexts.emailValueError),
    password: yup
      .string()
      .matches(/^[\w\-_]*$/, errorsTexts.passwordValueError)
      .min(3, errorsTexts.passwordMinLengthError)
      .max(10, errorsTexts.passwordMaxLengthError),
    repeatPassword: yup
      .string()
      .test(
        'isMatchesWithPassword',
        errorsTexts.passwordsNotMatches,
        (password) => password === getValues('password'),
      ),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(fieldsScheme),
  })

  const isEmptyFields =
    getValues('email') === '' ||
    getValues('password') === '' ||
    getValues('repeatPassword') === ''

  const emailError = errors.email?.message || null
  const passwordError = errors.password?.message || null
  const repeatPasswordError = errors.repeatPassword?.message || null

  const submitButtonRef = useRef(null)
  const validationOk =
    passwordError === null && repeatPasswordError === null && emailError === null

  if (validationOk === true && !isEmptyFields) {
    submitButtonRef.current.focus()
  }

  const onSubmit = (formData) => {
    console.log(formData)
  }

  const showErrorMessage = (message) => {
    return <div className={styles.messageError}>{message}</div>
  }

  const createInputPasswordForm = (name, placeholder) => {
    return (
      <input
        className={styles.formField}
        name={name}
        autoComplete="new-password"
        type="password"
        placeholder={placeholder}
        {...register(name)}
      />
    )
  }

  return (
    <>
      {' '}
      {/* <img
        className={styles.cosmo}
        src="https://static.vecteezy.com/system/resources/previews/027/291/162/non_2x/spaceman-astronaut-no-background-applicable-to-any-context-great-for-print-on-demand-merchandise-free-png.png"
        alt="whte_waves"
      /> */}
      <div className={styles.app}>
        <div>
          <img
            className={styles.cosmo}
            src="https://static.vecteezy.com/system/resources/previews/027/291/162/non_2x/spaceman-astronaut-no-background-applicable-to-any-context-great-for-print-on-demand-merchandise-free-png.png"
            alt="whte_waves"
          />
        </div>
        <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.formField}
            name="email"
            type="text"
            autoComplete="email"
            placeholder="Введите ваш email"
            {...register('email')}
          />
          {emailError && showErrorMessage(emailError)}

          {createInputPasswordForm('password', 'Введите пароль')}
          {passwordError && showErrorMessage(passwordError)}

          {createInputPasswordForm('repeatPassword', 'Повторите ваш пароль')}
          {repeatPasswordError && showErrorMessage(repeatPasswordError)}

          <button className={styles.formButton} type="submit" ref={submitButtonRef}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  )
}
