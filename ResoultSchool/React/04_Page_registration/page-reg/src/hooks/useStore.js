import { useState } from 'react'

const initialState = {
  login: null,
  password: null,
  email: null,
}

export const useStore = () => {
  const [state, setState] = useState(initialState)
  const [loginError, setLoginError] = useState(null)

  const { login } = initialState

  if (login !== null) {
    let error = null

    if (!/^[\w\-_]*$/.test(login)) {
      error =
        'Логин введен неверно. Допустимые символы: латиница, цифры, нижнее подчеркивание и тире'
    } else if (login.length > 10) {
      error = 'Допустимое количество символов не больше 10 '
    }

    setLoginError(error)
  }

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue })
    },
  }
}
