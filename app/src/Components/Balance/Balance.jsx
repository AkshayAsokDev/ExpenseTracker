import styles from "./Balance.module.css"
import { useState, useEffect } from "react";
import AddBalance from "../AddBalance/AddBalance";

function Balance() {

    const [balance, setBalance] = useState(5000);
    // console.log(typeof(balance));


    // useEffect to fetch balance from LocalStorage
    // cleaner function to update the value in LocalStorage
    useEffect(() => {

        const tempBal = parseInt(localStorage.getItem('balance'));
        
        if(tempBal){
            setBalance(tempBal);
        }


        return function () {
            localStorage.setItem('balance', JSON.stringify(balance));
        }

    }, [])
    

    return (<>
        <div className={styles.balanceWindow}>
            <p className={styles.balanceText} >{`Wallet Balance: `}<span style={{color:"#89E148"}} >{`₹${balance}`}</span></p>
            <button type="button" className={styles.incomeButton}>+ Add income</button>
        </div>
        <AddBalance balance={balance} setBalance={setBalance} />
        </>
    )
}

export default Balance;