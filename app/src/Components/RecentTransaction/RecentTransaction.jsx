import styles from "./RecentTransaction.module.css"
import { IoPizzaOutline, IoPencil, IoCloseCircleOutline } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { MdOutlineLuggage } from "react-icons/md";

const dummyData = {
    "title": "Gym",
    "price": 100,
    "date": "2025-06-01",
    "category": "travel"
}

function ListItem ({title, price, category, date}) {
    

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
            paddingBottom : "5px"
        }} >
            {/* //left side */}
            <span style={{
                display : "flex",
            }} >
                {/* food icon */}
                {dummyData.category === "food" && (<IoPizzaOutline style={{
                    background : "#D9D9D9",
                    color : "black",
                    width : "25px",
                    height : "25px",
                    borderRadius : "50%",
                    padding : "10px"
                }} />)}
                
                {/* movie icon */}
                {dummyData.category === "entertainment" && (<MdLocalMovies style={{
                    background : "#D9D9D9",
                    color : "black",
                    width : "25px",
                    height : "25px",
                    borderRadius : "50%",
                    padding : "10px"
                }} />)}

                {/* travel icon */}
                {dummyData.category === "travel" && (<MdOutlineLuggage style={{
                    background : "#D9D9D9",
                    color : "black",
                    width : "25px",
                    height : "25px",
                    borderRadius : "50%",
                    padding : "10px"
                }} />)}



                <span className={styles.listText}>
                    <span>{dummyData.title}</span>
                    <span style={{color : "grey"}} >{formatDate(dummyData.date)}</span>
                </span>
            </span>

            {/* Right side */}
            <span style={{
                display : "flex"
            }}>
                <span className={styles.priceStyle} >{`₹${dummyData.price}`}</span>
                <IoCloseCircleOutline style={{
                    background : "#fe3f3d",
                    color : "white",
                    width : "25px",
                    height : "25px",
                    borderRadius : "15px",
                    padding : "10px",
                    margin : "0px 5px 0px 5px",
                }} />
                <IoPencil style={{
                    background : "#f3bb4a",
                    color : "white",
                    width : "25px",
                    height : "25px",
                    borderRadius : "15px",
                    padding : "10px",
                    margin : "0px 5px 0px 5px",
                }} />
            </span>
            
        </div>
    )

}


export default function RecentTransaction({expenseData}) {

    


    return (
        <div className={styles.trcContainer} >
            <h2 className={styles.heading}>Recent Transactions</h2>
            <div className={styles.transactionWindow} >
                No Transactions
            </div>
            <div className={styles.transactionWindow} >
                <ListItem />
            </div>
        </div>
    )

}