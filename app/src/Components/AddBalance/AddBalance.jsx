import { useState } from "react";
import styles from "./AddBalance.module.css";
import { enqueueSnackbar } from "notistack";


export default function AddBalance({balance , setBalance, closeModal}) {

    const [value, setValue] = useState(0);

    const handleSubmit = (e) => {
        // console.log("submit >>", e.target.elements.addBalValue.value);
        const temp = parseInt(e.target.elements.addBalValue.value);
        
        setBalance(balance + temp);
        closeModal();
    }

    const validateInput = (e) => {

        // if income is negative
        if(parseInt(e.target.elements.addBalValue.value) <= 0 ){
            enqueueSnackbar("Income cannot be negative or zero", {
                variant : "error"
            })
            return false
        }

        return true

    }

    //return view
    return (
        <div className={styles.addBalanceWindow}>
            <p className={styles.addBalanceText} >{`Add Balance`}</p>
            <form
            onSubmit={(e) => {
                    e.preventDefault();

                    if(validateInput(e)) {
                        handleSubmit(e);
                        enqueueSnackbar("Income added successfully", {
                            variant : "success"
                        })
                    }
                    
            }}
            name="addBalanceForm"
            className={styles.balanceForm}>
                <input 
                name="addBalValue"
                value={value}
                onChange={(e) => {
                    // console.log("income >>", e.target.value);
                    setValue(e.target.value);
                }}
                className={styles.incomeInput} type="number" placeholder="Income Amount" />
                <button 
                type="submit" className={styles.addBalanceButton}>Add Balance</button>
                <button 
                onClick={closeModal}
                type="button" className={styles.cancelButton}>Cancel</button>
            </form>
        </div>
    )
}
