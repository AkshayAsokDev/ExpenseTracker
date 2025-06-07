import Balance from "../Balance/Balance";
import "./Tracker.css";
import Expense from "../Expense/Expense";
import { useEffect, useState } from "react";


export default function Tracker() {
    
    const [expenseData, setExpenseData] = useState(() => {
        const storedExpenseData = JSON.parse(localStorage.getItem('expenses'));

        return ((storedExpenseData === null) ? [] : storedExpenseData)
    });

    const [expense, setExpense] = useState(() => {
        const storedExpense = localStorage.getItem('expense');
        const intExpense = parseInt(storedExpense);

        return ((!isNaN(intExpense)) ? intExpense : 0)
    });


    useEffect(() => {
        console.log("expense data >> ", expenseData);
        console.log("expense >>", expense);
        
        //value received - lated update to save into localStorage
        localStorage.setItem('expenses', JSON.stringify(expenseData));
        localStorage.setItem('expense', expense);


    }, [expenseData, expense])

    return (
        <div className="tracker">
            <Balance />
            <Expense expense={expense} setExpense={setExpense} expenseData={expenseData} setExpenseData={setExpenseData} />
        </div>
    )
}