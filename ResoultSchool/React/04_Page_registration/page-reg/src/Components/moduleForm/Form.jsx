import { errorsTexts } from './hooks/errorsMessage'
import * as yup from 'yup'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as styles from './Form.module.scss'

export const Form = () => {
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
  )
}
