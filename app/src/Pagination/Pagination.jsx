import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import styles from "./Pagination.module.css";

function Pagination({setCurrentPage, currentPage, totalPages}) {

    // prev click handler
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage-1);
        }
    }

    const handleRight = () => {
        if (totalPages != currentPage){
            setCurrentPage(currentPage+1);
        }
    }

    return (
        <div className={styles.pageControlWindow}>
            {/* left button */}
            <button className={styles.button} onClick={handlePrev} disabled={currentPage === 1} >
                <IoIosArrowRoundBack />
            </button>

            <p className={styles.page} >{currentPage}</p>

            {/* right button */}
            <button className={styles.button} onClick={handleRight} disabled={totalPages === currentPage}>
                <IoIosArrowRoundForward />
            </button>
        </div>
    )
}

export default Pagination;