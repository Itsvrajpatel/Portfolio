import React from 'react';

const StatisticsSection = () => {
  return (
    <section style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="statistics-section">
      <div style={{ backgroundColor: '#151030', borderRadius: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '900px' }} className="card">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="statistics-content">
            <div style={{ textAlign: 'center', margin: '10px', minWidth: '200px', position: 'relative' }} className="statistic-item">
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }} className="statistic-title">Number of Projects</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }} className="statistic-number">6</p> {/* Example number of projects */}
              <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80%', borderBottom: '1px solid #ffffff80' }}></div>
            </div>
            <div style={{ textAlign: 'center', margin: '10px', minWidth: '200px', position: 'relative' }} className="statistic-item">
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }} className="statistic-title">Number of Mini Projects</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }} className="statistic-number">2</p> {/* Example number of mini projects */}
              <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80%', borderBottom: '1px solid #ffffff80' }}></div>
            </div>
            <div style={{ textAlign: 'center', margin: '10px', minWidth: '200px', position: 'relative' }} className="statistic-item">
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }} className="statistic-title">CGPA</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }} className="statistic-number">7.67</p> {/* Example CGPA */}
              <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80%', borderBottom: '1px solid #ffffff80' }}></div>
            </div>
            <div style={{ textAlign: 'center', margin: '10px', minWidth: '200px', position: 'relative' }} className="statistic-item">
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }} className="statistic-title">UI/UX Projects</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }} className="statistic-number">1</p> {/* Example UI/UX Projects */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
