import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  _id: string;
  status: string;
  model: string;
  brand: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
  appointment: {
    date: string;
    time: string;
  };
}

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/appointments');
      setAppointments(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(); // Initial fetch

    const interval = setInterval(() => {
      fetchAppointments();
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clear on unmount
  }, []);

  const markCompleted = async (id: string) => {
    try {
      await axios.put(`https://rppe4wbr3k.execute-api.eu-west-3.amazonaws.com/api/appointments/${id}/status`, {
        status: 'completed',
      });
      setAppointments(prev =>
        prev.map(appt =>
          appt._id === id ? { ...appt, status: 'completed' } : appt
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to mark appointment as completed.');
    }
  };

  if (loading) return <p style={styles.loading}>Loading appointments...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📅 Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p style={styles.empty}>No appointments found.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Model</th>
                <th style={styles.th}>Brand</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Created</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr
                  key={appt._id}
                  style={{
                    ...styles.row,
                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#f0f4f8',
                  }}
                >
                  <td style={styles.td}>{appt.customer?.name}</td>
                  <td style={styles.td}>{appt.customer?.email}</td>
                  <td style={styles.td}>{appt.model}</td>
                  <td style={styles.td}>{appt.brand}</td>
                  <td style={styles.td}>
                    {appt.status === 'completed' ? (
                      <span style={styles.completed}>✔ Completed</span>
                    ) : (
                      <button
                        style={styles.statusButton}
                        onClick={() => markCompleted(appt._id)}
                      >
                        {appt.status} → Mark Done
                      </button>
                    )}
                  </td>
                  <td style={styles.td}>{appt.appointment?.date}</td>
                  <td style={styles.td}>{appt.appointment?.time}</td>
                  <td style={styles.td}>
                    {new Date(appt.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '30px',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    backgroundColor: '#eef3f8',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '26px',
    fontWeight: 700,
    marginBottom: '20px',
    color: '#222',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#dee7f0',
    padding: '14px',
    fontWeight: 600,
    textAlign: 'left',
    color: '#333',
    borderBottom: '2px solid #ccc',
  },
  td: {
    padding: '12px',
    color: '#444',
    borderBottom: '1px solid #ddd',
  },
  row: {
    transition: 'background 0.2s',
  },
  statusButton: {
    padding: '6px 10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
  },
  completed: {
    color: '#28a745',
    fontWeight: 600,
    fontSize: '14px',
  },
  loading: {
    padding: '20px',
    fontFamily: 'system-ui',
    fontSize: '18px',
  },
  empty: {
    color: '#666',
    fontSize: '16px',
    paddingTop: '10px',
  },
};

export default AppointmentList;