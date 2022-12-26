import { useFirestore } from '../../hooks/useFirestore'

// styles
import styles from './Home.module.css'

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions')

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}

//Commentaires
//La fonctions TransactionList prend pour entrée l'array transactions et retourne
//un template HTML contenant des informations sur l'objet transaction, lui meme
//issu de l'array transactions. Chaque objet ou transaction est détaillé par 
//id, name, amount et dispose d'une bouton permettant de lancer la fonction
//deletedocument. L'appel de la fonction deleteDocument est rendu possible
//par l'invocation de la fonction useFirestore. Le choix de nomination de la variable
// transactions est réalisé dans la feuille de code transactionform par 
//const { addDocument, response } = useFirestore('transactions') mais
//dans la feuille de code useFirestore, on peut observer que cette array fait
//référence à la collection Firebase. On peut donc en déduire que les transactions
//représente la collection Firebase.