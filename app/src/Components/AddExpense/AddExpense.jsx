import { useEffect, useState } from "react";
import styles from "./AddExpense.module.css";
import { enqueueSnackbar } from "notistack";
import { v4 as uuidv4 } from 'uuid';



function AddExpense({expense, setExpense, expenseData, setExpenseData, closeModal, balance, setBalance, edit=false, editId, handleEdit}) {

    const [editData, setEditData] = useState({
        title : "",
        price : 0,
        date : "",
        id : "",
        category: ""
    })

    const handleSubmit = (e) => {
            // console.log("event >>", e);
            
            const data = {
                title : e.target.elements.title.value,
                price : parseInt(e.target.elements.price.value),
                date : e.target.elements.date.value,
                category : e.target.elements.category.value,
                id : uuidv4(),
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

        //if expense is greater than balance
        if(e.target.elements.price.value > balance){
            enqueueSnackbar("Expense should be less than available balance", {
                variant : "error"
            })
            return false
        }

        // if no errors, return true
        return true

    }

    
    const findEditItem = () => {

        if (edit == true) {
            // console.log("expenseData in edit >>", expenseData);
            const editItem = expenseData.find((x) => x.id === editId);
            // console.log("edit item >>", editItem);

            setEditData(editItem);
        }
        
    }

    useEffect(() => {

        findEditItem();

    }, [edit])

    return (

        <>
        
        {
            edit == true ? (
                <div className={styles.addBalanceWindow}>
                <p className={styles.addBalanceText} >{`Edit Expenses`}</p>
                <form
                onSubmit={(e) => {
                        e.preventDefault();

                        //before calling handler, run validation on input and only
                        //proceed to handler if passed
                        if(validateInput(e)){
                            handleEdit(editId, editData, closeModal);
                            enqueueSnackbar("Expense edited successfully", {
                                variant : "success"
                            })
                        }

                        
                }}
                name="addExpenseForm"
                className={styles.expenseForm}>
                    <input 
                    name="title"
                    className={styles.expenseInput} type="text" placeholder="Title" 
                    value={editData.title}
                    onChange={(e) => {
                        setEditData({
                            ...editData,
                            title : e.target.value
                        });
                    }}
                    />
                    <input 
                    name="price"
                    className={styles.expenseInput} type="number" placeholder="Price" 
                    value={editData.price}
                    onChange={(e) => {
                        setEditData({
                            ...editData,
                            price : parseInt(e.target.value)
                        });
                    }}
                    />
                    <input 
                    name="date"
                    className={styles.expenseInput} type="date"
                    value={editData.date}
                    onChange={(e) => {
                        setEditData({
                            ...editData,
                            date : e.target.value
                        });
                    }}
                    
                    />
                    <select name="category"
                    className={styles.expenseInput}
                    value={editData.category}
                    onChange={(e) => {
                        setEditData({
                            ...editData,
                            category : e.target.value
                        });
                    }}
                    >
                        <option value="" defaultValue>Select Category</option>
                        <option value="food" >Food</option>
                        <option value="travel" >Travel</option>
                        <option value="entertainment" >Entertainment</option>
                    </select>
                    <button 
                    type="submit" className={styles.addExpenseButton}>Edit Expense</button>
                    <button 
                    onClick={closeModal}
                    type="button" className={styles.cancelButton}>Cancel</button>
                </form>
            </div>
            ) : 
            (<div className={styles.addBalanceWindow}>
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
                    name="addExpenseForm"
                    className={styles.expenseForm}>
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
                </div>)
        }

        

            </>
    )
}


export default AddExpense;