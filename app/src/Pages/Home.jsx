import styles from "./Home.module.css";
import Tracker from "../Components/Tracker/Tracker";



function Home() {

    return (
        <div>
            <h1 className={styles.heading}>Expense Tracker</h1>
            <Tracker />
        </div>
    )
}

export default Home;