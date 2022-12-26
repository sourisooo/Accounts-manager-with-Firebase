import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // sign the user out
      await projectAuth.signOut()
      
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      } 
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}

//Commentaires
//Meme chose que la feuille de code useLogin. La différence résidant dans la méthode utiliséée
// signOut implémentée Firebase, du dispatch, et du retour de la fonction logout. Le dispatch ne précise
//pas de payload car la valeur attribuée à l'objet user sera la valeur null. Par ailleurs, la fonction
//ne prend aucun argument en entrée d ufait que la méthode signout ne nécessite aucun paramètre.