import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

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

  return { login, isPending, error }
}

//Commentaires
//La fonction useLogin retourne la fonction login et les variables isPending, error. Elle déclare
//3 variables qui utilisent useState. Ces variables sont principalement utilisés pour gérer
//les erreurs et également, en conjonction avec UseEffect, d'arreter la fonction en cas changement
//d'URL pendant le processus asynchrone de connection à Firebase. 
//La fonction asynchrone login prend pour entrée les variables email et password, elle réalise une
//demande de création d'un user par l'utilsation de la méthode signInWithEmailAndPassword auprès de la
// bdd Firebase. Ensuite, La demande de dispatch est envoyée, permettant la modification
//des variables adéquates par la feuille de code . L'usage de la fonction dispatch est rendu possible par l'invocation
//plus haut dans le code de la fonction useAuthContext, elle meme utilisant AuthContext. Rappelant que
//AuthContext gère toutes les demandes de dispatch relatives au user et à son authentification.
