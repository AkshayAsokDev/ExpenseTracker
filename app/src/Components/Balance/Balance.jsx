import styles from "./Balance.module.css"
import { useState, useEffect } from "react";
import AddBalance from "../AddBalance/AddBalance";
import ReactModal from "react-modal";



function Balance({balance, setBalance}) {

    // const [balance, setBalance] = useState(() => {
    //     const storedBalance = localStorage.getItem('balance');
    //     const intBalance = parseInt(storedBalance);

    //     return ((!isNaN(intBalance)) ? intBalance : 5000)
    // });
    // console.log(balance);
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    // useEffect(() => {
    //     localStorage.setItem('balance', JSON.stringify(balance));
    // }, [balance])
    
    console.log("balance >>", balance);

    return (<>
        <div className={styles.balanceWindow}>
            <p className={styles.balanceText} >{`Wallet Balance: `}{`₹${balance}`}</p>
            <button 
            onClick={openModal}
            type="button" className={styles.incomeButton}>+ Add Income</button>
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
            <AddBalance balance={balance} setBalance={setBalance} closeModal={closeModal} />    
        </ReactModal>
        
        </>
    )
}

export default Balance;