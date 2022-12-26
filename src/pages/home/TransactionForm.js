import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      uid, 
      name, 
      amount,
    })
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
    }
  }, [response.success])

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input 
            type="text"
            required
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)} 
            value={amount} 
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  )
}

//Commentaires
//La fonction TransactionForm prend pour entrée un uid et retourne un questionnaire HTML .
//Ce questionnaire HTML  incrémente les variables  uid, name, aount, cette incrémentation
//est faite par l'actualisation des variables usesState par la méthode Set puis la soumission du
// questionnaire dans un second temps puis de l'usage de la fonction
//addDocument. Cette fonction est utilisable du fait de l'invocation de la fonction useFirestore, cette
//dernière spécifiant addDocument, rappelant que la fonction useFirestore est la fonction interagissant
//avec Firestore.