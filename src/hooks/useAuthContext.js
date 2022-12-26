import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}

//Commentaires
//La fonction est utilisée par la feuille de code Home pour invoquer et utiliser
//l'objet user et appeler l'objet dans un template HTML.
//La fonction est également utilisée par la feuille de code App afin de réorienter
//l'internaute dans certain scénariis d'authentification.