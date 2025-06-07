import styles from "./Home.module.css";
import Tracker from "../Components/Tracker/Tracker";

//test
import AddBalance from "../Components/AddBalance/AddBalance";

function Home() {

    return (
        <div>
            <h1 className={styles.heading}>Expense Tracker</h1>
            <Tracker />

        </div>
    )
}

export default Home;