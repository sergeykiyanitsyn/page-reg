import { Image } from '../src/Components/moduleImage/Image'
import { Form } from '../src/Components/moduleForm/Form'
import * as styles from './App.module.scss'

export const App = () => {
  return (
    <>
      <div className={styles.app}>
        <Image />
        <Form />
      </div>
    </>
  )
}
