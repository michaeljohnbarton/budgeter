import './Home.css';
import { useEffect, useState } from 'react';

function Home() {
    const [months, setMonths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    useEffect(() => {
        async function fetchMonths() {
            try {
                const response = await fetch("http://localhost:60060/api/Month");
                if (!response.ok) {
                    throw new Error("Failed to fetch months");
                }

                const data = await response.json();
                setMonths(data);

                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonthNumber = currentDate.getMonth() + 1;
                const currentMonth = data.find(m => m.monthNumber === currentMonthNumber && m.year === currentYear);
                if (currentMonth) {
                    setSelectedMonth(currentMonth.id);
                } else {
                    setSelectedMonth(data[0]?.id || null);
                }
            } catch (err) {
                if(err.message === 'Failed to fetch') {
                    setError("Could not connect to the API.");
                } else {
                    setError(err.message);
                }
                
            } finally {
                setLoading(false);
            }
        }

        fetchMonths();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (months.length === 0) return <p>No months available. Add months in Configuration.</p>;

    return (
        <div id="home-page">
            <div id="month-selector-wrapper">
                <select id="month-selector" value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                    {months.map((month) => (
                        <option key={month.id} value={month.id}>
                            {month.name} {month.year}
                        </option>
                    ))}
                </select>
            </div>
            <p>{months[selectedMonth - 1]?.name} {months[selectedMonth - 1]?.year} is selected</p>
        </div>

        
    )
}

export default Home;