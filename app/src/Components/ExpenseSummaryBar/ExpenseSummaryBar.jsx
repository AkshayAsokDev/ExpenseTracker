import styles from "./ExpenseSummaryBar.module.css"
import { BarChart, Bar, ResponsiveContainer, Legend, XAxis, YAxis } from 'recharts';



export default function ExpenseSummaryBar({pieData}) {

    // console.log("inside bar>>", pieData);


    return (
        <div className={styles.topWindow}>
            <h2 className={styles.heading}>Top Expenses</h2>
            <div className={styles.barWindow}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={150} height={40} data={pieData} layout="vertical">
                    <XAxis hide type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Bar dataKey="value" fill="#8884d8" radius={[0,50,50,0]} />
                    
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )

}