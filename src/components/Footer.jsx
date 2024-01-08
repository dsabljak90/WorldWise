import styles from './Footer.module.css'

function Footer({children}) {
  return(
    <footer className={styles.footer}>
      <p className={styles.copyright}>{children}</p>
      </footer>
  )
}

export default Footer;
