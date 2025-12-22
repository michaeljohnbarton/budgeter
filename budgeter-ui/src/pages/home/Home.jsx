import './Home.css';
import { useContext, useEffect, useState } from 'react';
import { LoadingContext } from "../../contexts/LoadingContext";

function Home() {
    const { setLoading } = useContext(LoadingContext);
    const [months, setMonths] = useState([]);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        async function fetchMonths() {
            try {
                setLoading(true);

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
                setHasLoaded(true);
            }
        }

        fetchMonths();
    }, []);

    if (!hasLoaded) return null;
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