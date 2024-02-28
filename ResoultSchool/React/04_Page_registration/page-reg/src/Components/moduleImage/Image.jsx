import styles from './Image.module.css'

const URL_SRC =
  'https://static.vecteezy.com/system/resources/previews/027/291/162/non_2x/spaceman-astronaut-no-background-applicable-to-any-context-great-for-print-on-demand-merchandise-free-png.png'

export const Image = () => {
  return (
    <div>
      <img className={styles.cosmo} src={URL_SRC} alt="whte_waves" />
    </div>
  )
}
