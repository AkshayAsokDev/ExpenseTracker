import styles from "./Expense.module.css"
import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import AddExpense from "../AddExpense/AddExpense";


export default function Expense ({expense, setExpense, expenseData, setExpenseData}) {


    

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    return (<>
        <div className={styles.expenseWindow}>
            <p className={styles.expenseText} >{`Expenses: `}<span style={{color:"#f4bb4a"}} >{`₹${expense}`}</span></p>
            <button 
            onClick={openModal}
            type="button" className={styles.expenseButton}>+ Add Expense</button>
        </div>

        <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{
            content : {
                top : "20%",
                left : "20%",
                right : "20%",
                background : "transparent",
                border : "none"
                
            },
        }}
        >
            <AddExpense closeModal={closeModal} expense={expense} setExpense={setExpense} expenseData={expenseData} setExpenseData={setExpenseData} />
        </ReactModal>
    </>)


}