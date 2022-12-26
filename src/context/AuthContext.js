import { createContext, useReducer, useEffect } from 'react'
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}

//Commentaires
//La fonction AuthContextProvider prend pour entrée une page HTML children et retourne la page HTML children après qu'une
//variable ou un objet ait été modifié à l'aide d'un dispatch. Techniquement, la fonction AuthContextProvider définit
//des variables avec leur valeur initiale: user: null, authIsReady: false, les variables étant représentées par l'objet
//state, puis définit une action spécifique lorsque le dispatch est retourné 'AUTH_IS_READY', la fonction authReducer
//est appliquée. Ce dispatch de type 'AUTH_IS_READY' est lancé une fois lorsque la page HTML est actualisée. 

// La fonction authReducer vise à prendre un objet et une action en entrée puis retourner l'objet modifié par l'action
//en retour de fonction. La fonction prend en charge 3 scénariis: login, logout et AUTH_IS_READY'. 
//Ces 3 scénaris vont prendre en charge
//les demandes faites par les feuilles de code useLogin, useLogout et useSignup, appliquées un dispatch cad une action
//spécifiques au scénari, généralement modifier une variable d'un objet puis retourner l'objet, ici state.
//Le principal avantage de useReducer vient du fait que cette outil REACT permet de modifier la valeur
//d'une variable à l'intérieur d'un objet de manière dynamique tout en resteignant à l'avance les valeurs que pourront
// avoir ces variables. L'outil createContext de REACT vise à etre en mesure de donner une portée générale à un objet
//ou une fonction. La constante AuthContext est affectée de createcontext afin de pouvoir etre appeler pour entourer
//la page HTML children lors du retour de la fonction authReducer. La fonction authReducer va etre utiliser pour
//orienter les dispatchs et modifier les variables prises pour entrées (state, action) selon des scénariis souhaités
//spécifiques et modifier ses variables selon les scénaris. Le dispatch permet de préciser le scénari à utiliser. On
//peut souligner que les modifications des variables sont fermés et maitiens un controle sur les possiblités de valeur 
//que peuvent prendre les variables contrairement à l'outil REACT useState.