import styles from "./Balance.module.css"
import { useState, useEffect } from "react";
import AddBalance from "../AddBalance/AddBalance";
import ReactModal from "react-modal";



function Balance() {

    const [balance, setBalance] = useState(5000);
    // console.log(typeof(balance));
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


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
            <button 
            onClick={openModal}
            type="button" className={styles.incomeButton}>+ Add income</button>
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