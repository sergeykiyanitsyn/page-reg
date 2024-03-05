/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { validate } from './utils'
import styles from './field.module.css'

export const Field = ({
  value,
  setValue,
  setIsValid,
  validators,
  dependencies = {},
  forceValidation = () => false,
  ...props
}) => {
  const [error, setError] = useState(null)
  const [isDirty, setIsDirty] = useState()

  const validateField = (currentValue, shouldValidate) => {
    let error = null
    let isValide = false

    if (shouldValidate) {
      error = validate(currentValue, validators)
      isValide = error === null
    }

    setError(error)
    setIsValid(isValide)
  }

  useEffect(() => {
    validateField(value, isDirty)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(dependencies)])

  const onChange = ({ target }) => {
    setIsDirty(true)
    setValue(target.value)

    const isForceValidated = forceValidation(target.value)

    validateField(target.value, isForceValidated)
  }

  const onBlur = ({ target }) => validateField(target.value, isDirty)

  return (
    <div className={styles.formLabel}>
      <input onChange={onChange} onBlur={onBlur} {...props} />
      {error && <span className={styles.errorLabel}>{error}</span>}
    </div>
  )
}
