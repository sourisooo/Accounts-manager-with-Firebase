import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'

// styles
import styles from './Navbar.module.css'

export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>
        
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}

        {user && (
          <>
            <li>hello, {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

//Commentaires
//La fonction Navbar invoque les fonctions useLogout et useAuthContext pour pouvoir utiliser l' objet
// user et la fonction logout dans la navbar. La fonction Navbar retourne un template HTML avec un lien vers la page
//login et un autre vers la page signup. Puis l' objet user et la fonction logout sont invoqués dans le template
//HTML pour afficher un message d'accueuil dynamique et affecter la fonction logout à un bouton.