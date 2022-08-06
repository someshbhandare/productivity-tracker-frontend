import './App.css';
import { useEffect, useState } from 'react';

const addActivity = async (event) => {
  event.preventDefault();
  const activity = {
    name: event.target.activity.value,
    time: event.target.time.value
  }

  await fetch(`${process.env.REACT_APP_BACKEND_URL}/activity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(activity)
  })

  event.target.activity.value = "";
  event.target.time.value = "";
  window.location.reload();
}

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/activities`);
      const data = await result.json();
      setActivities(data);
    }
    fetchData();
  }, [])
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Productivity Tracker</h1>
        <form onSubmit={addActivity}>
          <div>
            <label htmlFor="activity">Activity: </label>
            <input type="text" name="activity" id="activity" />
          </div>
          <div>
            <label htmlFor="time">Time Taken: </label>
            <input type="text" name="time" id="time" />
          </div>
          <button type="submit">Add</button>
        </form>
      </header>
      <main className="app-main">
        <h2>Today: </h2>
        {activities && activities.length > 0 ? (
          <ol>
            {activities.map(activity => (
              <li key={activity._id} >{activity.name} - {activity.time}</li>
            ))}
          </ol>
        ): (
          <p>No activities to show</p>
        )}
      </main>
    </div>
  );
}

export default App;
