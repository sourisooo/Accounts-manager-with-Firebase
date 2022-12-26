import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = projectFirestore.collection(collection)

    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, query, orderBy])

  return { documents, error }
}

//Commentaires
//La fonction useCollection prend pour entrée des variables Firebase (collection, _query, _orderBy) et retourne
//l'objet documents et la variable error. Cette fonction est incrémentée par l'outil useEffet de REACT qui va s'activer
//à chaque modification de la collection, query ou orderby. Dans un premier temps, la variable ref stock la requete sous
//la forme d'une codification spécifique à Firestore. Ensuite, la méthode snapshot est utilisée sur cette variable pour 
//récupérer tout les objets de l'array snapshot et les injecter dans un array results qui va etre utiliser par la suite
//pour modifier la valeur de la variable documents à travers l'appel de fonction setDocuments. Ses documents pourront par la suite
//etre utiliser pour afficher des informations relatives à un user notemment sur la page HTLM home.