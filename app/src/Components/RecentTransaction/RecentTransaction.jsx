import { useEffect, useState, useRef } from "react";
import styles from "./RecentTransaction.module.css"
import { IoPizzaOutline, IoPencil, IoCloseCircleOutline } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { MdOutlineLuggage } from "react-icons/md";
import Pagination from "../../Pagination/Pagination";
import ReactModal from "react-modal";
import AddExpense from "../AddExpense/AddExpense";
import { enqueueSnackbar } from "notistack";

const dummyData = {
    "title": "Gym",
    "price": 100,
    "date": "2025-06-01",
    "category": "travel"
}

const dummyExpense = [
    {
    "title": "Gym",
    "price": 100,
    "date": "2025-06-01",
    "category": "travel"
    },
    {
    "title": "Apple",
    "price": 100,
    "date": "2025-06-01",
    "category": "food"
    },
    {
    "title": "Gym",
    "price": 100,
    "date": "2025-06-01",
    "category": "travel"
    },
    {
    "title": "Apple",
    "price": 100,
    "date": "2025-06-01",
    "category": "food"
    }
]

function ListItem ({title, price, category, date, editId, handleDelete, handleEdit, expenseData, setExpenseData, balance, setBalance, expense, setExpense}) {
    

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })

        return formattedDate
    }



    return (
        <div style={{
            display : "flex",
            justifyContent : "space-between",
            borderBottom : "1px solid black",
            paddingBottom : "5px",
            marginBottom : "25px",
        }} >
            {/* //left side */}
            <span style={{
                display : "flex",
            }} >
                {/* food icon */}
                {category === "food" && (<IoPizzaOutline style={{
                    background : "#D9D9D9",
                    color : "black",
                    width : "25px",
                    height : "25px",
                    borderRadius : "50%",
                    padding : "10px"
                }} />)}
                
                {/* movie icon */}
                {category === "entertainment" && (<MdLocalMovies style={{
                    background : "#D9D9D9",
                    color : "black",
                    width : "25px",
                    height : "25px",
                    borderRadius : "50%",
                    padding : "10px"
                }} />)}

                {/* travel icon */}
                {category === "travel" && (<MdOutlineLuggage style={{
                    background : "#D9D9D9",
                    color : "black",
                    width : "25px",
                    height : "25px",
                    borderRadius : "50%",
                    padding : "10px"
                }} />)}



                <span className={styles.listText}>
                    <span>{title}</span>
                    <span style={{color : "grey"}} >{formatDate(date)}</span>
                </span>
            </span>

            {/* Right side */}
            <span style={{
                display : "flex"
            }}>
                <span className={styles.priceStyle} >{`₹${price}`}</span>
                <IoCloseCircleOutline style={{
                    background : "#fe3f3d",
                    color : "white",
                    width : "25px",
                    height : "25px",
                    borderRadius : "15px",
                    padding : "10px",
                    margin : "0px 5px 0px 5px",
                }} 
                onClick={() => {
                    handleDelete(editId);
                }}
                />
                <IoPencil style={{
                    background : "#f3bb4a",
                    color : "white",
                    width : "25px",
                    height : "25px",
                    borderRadius : "15px",
                    padding : "10px",
                    margin : "0px 5px 0px 5px",
                }} 
                onClick={openModal}
                />
            </span>
            
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
                <AddExpense edit={true} editId={editId} handleEdit={handleEdit} closeModal={closeModal} 
                expenseData={expenseData} setExpenseData={setExpenseData}
                expense={expense} setExpense={setExpense} balance={balance} setBalance={setBalance} />
            </ReactModal>
        </div>
    )

}


const maxRecords = 3;

export default function RecentTransaction({expenseData, setExpenseData, balance, setBalance, expense, setExpense}) {

    // const prevRef = useRef(null);
    // const nextRef = useRef(null);

    //for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentTransactions, setCurrentTransactions] = useState([]);

    // useeffect to calculate the start, end and then slice the expense
    useEffect(() => {

        const start = (currentPage-1) * maxRecords;
        const end = Math.min(currentPage * maxRecords, expenseData.length);

        setCurrentTransactions([...expenseData].slice(start, end));
        setTotalPages(Math.ceil(expenseData.length / maxRecords));

    }, [currentPage, expenseData])

    // useffect to delete if all items are deleted
    

    // handle delete
    const handleDelete = (id) => {

        const item = expenseData.find((x) => x.id === id);
        const price = item.price;
        // console.log("item to be deleted >> ", item);

        const newData = expenseData.filter((exp) => exp.id != id);
        setExpense(expense-price);
        setExpenseData(newData);
        setBalance(balance+price);
    }

    // handle edit
    const handleEdit = (id, editData, closeModal) => {
        // console.log("in edit function, with id :", id);
        // console.log("edit data >> ", editData);

        const updated = expenseData.map((exp) => {

            if (exp.id === editData.id) {

                const priceDiff = exp.price - editData.price;
                // console.log("price diff >> ", priceDiff);

                if (priceDiff<0 && Math.abs(priceDiff) > balance){
                    enqueueSnackbar("Price should not exceed balance", {
                        variant : "error"
                    })
                    return {...exp}
                }

                setBalance(prev => prev + priceDiff);
                setExpense(prev => prev - priceDiff);
                return {...editData}
            }
            else {
                return exp
            }
        })

        // console.log("updated expense data >> ", updated);
        setExpenseData(updated);

        closeModal();


    }

    return (
        <div className={styles.trcContainer} >
            <h2 className={styles.heading}>Recent Transactions</h2>
            
            {
                expenseData.length === 0 && (<div className={styles.transactionWindow} >
                No Transactions
            </div>)
            }


            {/* //pagination logic  */}
            {
                expenseData.length > 0 && (
                    <div className={styles.transactionWindow} >
                        <div>
                            {
                                currentTransactions.map(trc => (
                                            <ListItem 
                                                title={trc.title}
                                                price={trc.price}
                                                category={trc.category}
                                                date={trc.date}
                                                key={trc.id}
                                                editId={trc.id}
                                                handleDelete={handleDelete}
                                                handleEdit={handleEdit}
                                                balance={balance} setBalance={setBalance}
                                                expenseData={expenseData} setExpenseData={setExpenseData}
                                                expense={expense} setExpense={setExpense}
                                                
                                            />
                                ))
                            }
                        </div>
                        {
                            totalPages > 1 && (<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />)
                        }
                    </div>
                )
            }

            
            
        </div>
    )

}