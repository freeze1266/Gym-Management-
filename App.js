// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [members, setMembers] = useState([]);
  const [recentMembers, setRecentMembers] = useState([]);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [membershipStartDate, setMembershipStartDate] = useState('');
  const [planName, setPlanName] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [exercises, setExercises] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch members
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error('Error fetching members:', error));

    // Fetch workout plans
    fetch('/api/workout-plans')
      .then((res) => res.json())
      .then((data) => setWorkoutPlans(data))
      .catch((error) => console.error('Error fetching workout plans:', error));
  }, []);

  const handleAddMember = () => {
    fetch('/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        membershipStartDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers([...members, data]);
        setRecentMembers([data, ...recentMembers.slice(0, 4)]); // Keep the 5 most recent members
      })
      .catch((error) => console.error('Error adding member:', error));
  };

  const handleAddWorkoutPlan = () => {
    fetch('/api/workout-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        memberId: selectedMember,
        planName,
        exercises: exercises.split(',').map((exercise) => exercise.trim()),
        startDate,
        endDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => setWorkoutPlans([...workoutPlans, data]))
      .catch((error) => console.error('Error adding workout plan:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gym Management System</h1>
      </header>
      <div className="section">
        <div className="subsection">
          <h2>Members</h2>
          <ul>
            {members.map((member) => (
              <li key={member._id}>
                {member.name} - {member.email} - {member.phone} - {member.membershipStartDate}
              </li>
            ))}
          </ul>
        </div>
        <div className="subsection form-section">
          <h2>Add Member</h2>
          <form>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label>Phone:</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <br />
            <label>Membership Start Date:</label>
            <input
              type="date"
              value={membershipStartDate}
              onChange={(e) => setMembershipStartDate(e.target.value)}
            />
            <br />
            <button type="button" onClick={handleAddMember}>
              Add Member
            </button>
          </form>
        </div>
      </div>
      <div className="section">
        <div className="subsection">
          <h2>Recent Members</h2>
          <ul>
            {recentMembers.map((recentMember) => (
              <li key={recentMember._id}>
                {recentMember.name} - {recentMember.email} - {recentMember.phone} - {recentMember.membershipStartDate}
              </li>
            ))}
          </ul>
        </div>
        <div className="subsection">
          <h2>Workout Plans</h2>
          <ul>
            {workoutPlans.map((plan) => (
              <li key={plan._id}>
                {plan.planName} - {plan.startDate} to {plan.endDate}
              </li>
            ))}
          </ul>
        </div>
        <div className="subsection form-section">
          <h2>Add Workout Plan</h2>
          <form>
            <label>Member:</label>
            <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
              <option value="" disabled>
                Select Member
              </option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
            <br />
            <label>Plan Name:</label>
            <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} />
            <br />
            <label>Exercises (comma-separated):</label>
            <input type="text" value={exercises} onChange={(e) => setExercises(e.target.value)} />
            <br />
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <br />
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <br />
            <button type="button" onClick={handleAddWorkoutPlan}>
              Add Workout Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
