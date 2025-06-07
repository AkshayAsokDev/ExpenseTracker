import { useState } from "react";
import styles from "./AddExpense.module.css";



function AddExpense({expense, setExpense, expenseData, setExpenseData, closeModal}) {

    

    const handleSubmit = (e) => {
            // console.log("event >>", e);
            
            const data = {
                title : e.target.elements.title.value,
                price : parseInt(e.target.elements.price.value),
                data : e.target.elements.date.value,
                category : e.target.elements.category.value
            }
            console.log("data >> ", data);
            setExpenseData([...expenseData, data]);
            setExpense(expense+data.price);

            closeModal();
    }

    return (
        <div className={styles.addBalanceWindow}>
                    <p className={styles.addBalanceText} >{`Add Expenses`}</p>
                    <form
                    onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                    }}
                    name="addExpenseForm">
                        <input 
                        name="title"
                        className={styles.incomeInput} type="text" placeholder="Title" />
                        <input 
                        name="price"
                        className={styles.incomeInput} type="number" placeholder="Price" />
                        <input 
                        name="date"
                        className={styles.incomeInput} type="date"/>
                        <select name="category"
                        className={styles.incomeInput}
                        >
                            <option value="" defaultValue>Select Category</option>
                            <option value="food" >Food</option>
                            <option value="travel" >Travel</option>
                            <option value="entertainment" >Entertainment</option>
                        </select>
                        <button 
                        type="submit" className={styles.addBalanceButton}>Add expense</button>
                        <button 
                        onClick={closeModal}
                        type="button" className={styles.cancelButton}>Cancel</button>
                    </form>
                </div>
    )
}


export default AddExpense;