import { useState } from "react";
import styles from "./AddBalance.module.css";


export default function AddBalance({balance , setBalance}) {

    const [value, setValue] = useState(0);

    const handleSubmit = (e) => {
        console.log("submit >>", e.target.elements.addBalValue.value);
        const temp = parseInt(e.target.elements.addBalValue.value);
        
        setBalance(balance + temp);
    }



    //return view
    return (
        <div className={styles.addBalanceWindow}>
            <p className={styles.addBalanceText} >{`Add Balance`}</p>
            <form
            onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
            }}
            name="addBalanceForm">
                <input 
                name="addBalValue"
                value={value}
                onChange={(e) => {
                    // console.log("income >>", e.target.value);
                    setValue(e.target.value);
                }}
                className={styles.incomeInput} type="number" placeholder="Income Amount" />
                <button 
                type="submit" className={styles.addBalanceButton}>Add balance</button>
                <button type="button" className={styles.cancelButton}>Cancel</button>
            </form>
        </div>
    )
}
