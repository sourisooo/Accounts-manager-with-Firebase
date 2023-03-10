import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }

}

//Commentaires
//La fonction firestoreReducer est un reducer pour prendre en charge les dispatchs 
//IS_PENDING, ADDED_DOCUMENT, DELETED_DOCUMENT, ERROR. Ces dispatchs sont sp??cifi??s dans
//les fonctions addDocument et deleteDocument. 
//La fonction useFirestore d??finit la variable response comme variable initiale et appelle
//la fonction firestoreReducer lorsque le dispatch est appel??. La fonction retourne
//addDocument, deleteDocument, response.
//La fonction aysnchrone addDocument prend un doc en
//entr??e de fonction puis cr??e et utilise  la variable qui va stocker la r??ponse de la base
//de donn??e, ins??re le doc dans la collection,le dispatch est ensuite ex??cuter en pr??cisant le payload 
//addedDocument, faisant r??f??rence ?? l'objet r??cup??rer en r??ponse de la bdd.
//La fonction aysnchrone deleteDocument prend pour entr??e une id puis supprime le document
//de la collection en utilisant une m??thode impl??ment??e firebase delete. Le dispatch ne sp??cifie pas
//de payload car le param??tre useReducer qui va etre utiliser est la valeur null.
// La m??thode setIsCancelled(true) en retour de fonction de useEffect est utilis??e pour annuler
//toutes tentatives de connection avec la bdd en cas d'actualisation de la page HTML.
