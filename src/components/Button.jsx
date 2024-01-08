import {useNavigate} from 'react-router-dom'
import styles from "./Button.module.css";

function Button({children, onClick, type}) {
  const navigate =  useNavigate()
    return(
      <>
      <div className="btn"></div>
      <button
     onClick={onClick}
     className={`${styles.btn} ${styles[type]}`}
     >
      {children}
     </button>
     </>
    )
  }

  export default Button;
