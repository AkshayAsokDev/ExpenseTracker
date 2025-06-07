import styles from "./Balance.module.css"


function Balance() {

    return (
        <div className={styles.balanceWindow}>
            <p className={styles.balanceText} >{`Wallet Balance: `}<span style={{color:"#89E148"}} >{`₹5000`}</span></p>
            <button type="button" className={styles.incomeButton}>+ Add income</button>
        </div>
    )
}

export default Balance;