import { useEffect, useState, useRef } from "react";
import styles from "./RecentTransaction.module.css"
import { IoPizzaOutline, IoPencil, IoCloseCircleOutline } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { MdOutlineLuggage } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

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

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // const [groupedItems, setGroupedItems] = useState([]);


    // const sliceArray = (array, size) => {
    //     const chunks = [];

    //     for(let i=0; i<array.length; i+=size){
    //         chunks.push(array.slice(i, i+size));
    //     }

    //     console.log("chunks>> ", chunks);
    //     return chunks
    // }

    // useEffect(() => {

    //     const data = sliceArray(expenseData, 3);
    //     setGroupedItems(data);

    // }, [expenseData])
    

    return (
        <div className={styles.trcContainer} >
            <h2 className={styles.heading}>Recent Transactions</h2>
            
            {
                expenseData.length === 0 && (<div className={styles.transactionWindow} >
                No Transactions
            </div>)
            }

            <div className={styles.transactionWindow} >
                

                {/* Page system */}
                <div>
                    {/* left button */}
                    <button ref={prevRef} className={styles.customLeftButton}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 16C32 7.1875 24.8125 0 16 0C7.125 0 0 7.1875 0 16C0 24.875 7.125 32 16 32C24.8125 32 32 24.875 32 16ZM16.9375 8.4375C17.5 7.875 18.4375 7.875 19 8.4375C19.625 9.0625 19.625 10 19 10.5625L13.5625 16L19 21.4375C19.625 22.0625 19.625 23 19 23.5625C18.4375 24.1875 17.5 24.1875 16.9375 23.5625L10.4375 17.0625C9.8125 16.5 9.8125 15.5625 10.4375 15L16.9375 8.4375Z" fill="#34C94B" />
                        </svg>
                    </button>

                    {/* right button */}
                    <button ref={nextRef} className={styles.customRightButton}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16C0 24.875 7.125 32 16 32C24.8125 32 32 24.875 32 16C32 7.18747 24.8125 -3.05176e-05 16 -3.05176e-05C7.125 -3.05176e-05 0 7.18747 0 16ZM15.0625 23.5625C14.4375 24.1875 13.5 24.1875 12.9375 23.5625C12.3125 23 12.3125 22.0625 12.9375 21.5L18.375 16.0625L12.9375 10.625C12.3125 9.99997 12.3125 9.06247 12.9375 8.49997C13.5 7.87497 14.4375 7.87497 15.0625 8.49997L21.5625 14.9375C22.125 15.5625 22.125 16.5 21.5625 17.0625L15.0625 23.5625Z" fill="#34C94B" />
                        </svg>
                    </button>

                    <Swiper 
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={1}
                        slidesPerGroup={2}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                    >

                        {
                            expenseData.map((trc,index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <ListItem 
                                            title={trc.title}
                                            price={trc.price}
                                            category={trc.category}
                                            date={trc.date}
                                        />
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>

                </div>
            </div>
        </div>
    )

}