import Balance from "../Balance/Balance";
import "./Tracker.css";
import Expense from "../Expense/Expense";
import { useEffect, useState } from "react";
import ExpenseSummaryPie from "../ExpenseSummaryPie/ExpenseSummaryPie";
import ExpenseSummaryBar from "../ExpenseSummaryBar/ExpenseSummaryBar";
import RecentTransaction from "../RecentTransaction/RecentTransaction";

export default function Tracker() {
    
    const [balance, setBalance] = useState(() => {
        const storedBalance = localStorage.getItem('balance');
        const intBalance = parseInt(storedBalance);
        console.log("intbalance >>", intBalance);

        return ((!isNaN(intBalance)) ? intBalance : 5000)
    });

    const [expenseData, setExpenseData] = useState(() => {
        const storedExpenseData = JSON.parse(localStorage.getItem('expenses'));

        return ((storedExpenseData === null) ? [] : storedExpenseData)
    });

    const [expense, setExpense] = useState(() => {
        const storedExpense = localStorage.getItem('expense');
        const intExpense = parseInt(storedExpense);

        return ((!isNaN(intExpense)) ? intExpense : 0)
    });

    const [pieData, setPieData] = useState([{name : 'Food', value : 0}, {name : 'Entertainment', value : 0}, {name : 'Travel', value : 0}]);


    useEffect(() => {
        localStorage.setItem('balance', JSON.stringify(balance));
    }, [balance])

    useEffect(() => {
        console.log("expense data >> ", expenseData);
        console.log("expense >>", expense);
        
        //value received - lated update to save into localStorage
        localStorage.setItem('expenses', JSON.stringify(expenseData));
        localStorage.setItem('expense', expense);

        //balance update
        setBalance(balance-expense);

        //calculate data for chart and bar
        
        const calculateData = () => {
            return pieData.map(cat => {
                const total = expenseData.reduce((acc, curr) => {
                    if (cat.name.toLowerCase() === curr.category) {
                    return acc + curr.price;
                    }
                    return acc;
                }, 0);

                return { name: cat.name, value: total };
            });
        };

        setPieData(calculateData());
        


    }, [expenseData, expense])

    return (
        <>
        <div className="tracker">
            <Balance balance={balance} setBalance={setBalance} />
            <Expense expense={expense} setExpense={setExpense} expenseData={expenseData} setExpenseData={setExpenseData} />
            <ExpenseSummaryPie pieData={pieData} />
        </div>
        <div className="barContainer">
            <RecentTransaction expenseData={expenseData} />
            <ExpenseSummaryBar pieData={pieData} />
        </div>
        </>
    )
}