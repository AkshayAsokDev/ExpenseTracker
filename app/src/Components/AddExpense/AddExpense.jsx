import { useState } from "react";
import styles from "./AddExpense.module.css";
import { enqueueSnackbar } from "notistack";



function AddExpense({expense, setExpense, expenseData, setExpenseData, closeModal, balance, setBalance}) {

    

    const handleSubmit = (e) => {
            // console.log("event >>", e);
            
            const data = {
                title : e.target.elements.title.value,
                price : parseInt(e.target.elements.price.value),
                date : e.target.elements.date.value,
                category : e.target.elements.category.value
            }
            console.log("data >> ", data);
            setExpenseData([...expenseData, data]);
            setExpense(expense+data.price);
            //update balance
            setBalance(balance-data.price);


            closeModal();
    }

    const validateInput = (e) => {
        
        // if title is empty
        if(e.target.elements.title.value === ""){
            enqueueSnackbar("Please enter title", {
                variant : "error"
            })
            return false
        }

        // if price is NaN
        if(isNaN(parseInt(e.target.elements.price.value))){
            enqueueSnackbar("Please enter price", {
                variant : "error"
            })
            return false
        }

        // if date is empty
        if(e.target.elements.date.value === ""){
            enqueueSnackbar("Please enter date", {
                variant : "error"
            })
            return false
        }

        //if category is empty
        if(e.target.elements.category.value === ""){
            enqueueSnackbar("Please enter category", {
                variant : "error"
            })
            return false
        }

        // if no errors, return true
        return true

    }

    return (
        <div className={styles.addBalanceWindow}>
                    <p className={styles.addBalanceText} >{`Add Expenses`}</p>
                    <form
                    onSubmit={(e) => {
                            e.preventDefault();

                            //before calling handler, run validation on input and only
                            //proceed to handler if passed
                            if(validateInput(e)){
                                handleSubmit(e);
                                enqueueSnackbar("Expense added successfully", {
                                    variant : "success"
                                })
                            }

                            
                    }}
                    name="addExpenseForm">
                        <input 
                        name="title"
                        className={styles.expenseInput} type="text" placeholder="Title" />
                        <input 
                        name="price"
                        className={styles.expenseInput} type="number" placeholder="Price" />
                        <input 
                        name="date"
                        className={styles.expenseInput} type="date"/>
                        <select name="category"
                        className={styles.expenseInput}
                        >
                            <option value="" defaultValue>Select Category</option>
                            <option value="food" >Food</option>
                            <option value="travel" >Travel</option>
                            <option value="entertainment" >Entertainment</option>
                        </select>
                        <button 
                        type="submit" className={styles.addExpenseButton}>Add Expense</button>
                        <button 
                        onClick={closeModal}
                        type="button" className={styles.cancelButton}>Cancel</button>
                    </form>
                </div>
    )
}


export default AddExpense;