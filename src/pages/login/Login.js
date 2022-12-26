import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </label>
      { !isPending && <button className="btn">Login</button> }
      { isPending && <button className="btn" disabled>loading</button> }
      { error && <p>{error}</p> }
    </form>
  )
}

//Commentaires
//La fonction Login retourne un questionnaire HTML, les différents champs incrémentent
//les variables useState à travers la méthode Set. La soumission du questionnaire permet
//l'appel ou l'exécution de la fonction login avec pour arguments email, password, arguments
//qui ne sont rien d'autre que les données qui ont été actualisés avec useState. L'exécution
//de la fonction login est rendu possible par l'invocation de la fonction uselogin, uselogin
//étant la fonction définissant la fonction login. Attention la fonction spécifiée par uselogin
//est login(avec un petit l) et ne fait pas du tout référence à la méthode Login(grand L). Pour
//rappel, useLogin est la fonction qui va demander une requete de recherche/confirmation user auprès de 
//firebase.