import React, { useState } from 'react';

const App = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [strengthLevel, setStrengthLevel] = useState(0); 

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const checkPasswordStrength = (password) => {
    let strength = 'Weak';
    const criteria = [
      { regex: /.{8,}/ },       
      { regex: /[A-Z]/ },      
      { regex: /[a-z]/ },       
      { regex: /[0-9]/ },     
      { regex: /[^A-Za-z0-9]/ }, 
    ];

    const passedCriteria = criteria.filter((criterion) => criterion.regex.test(password));

   
    setStrengthLevel(passedCriteria.length);
    
    switch (passedCriteria.length) {
      case 5:
        strength = 'Very Strong';
        break;
      case 4:
        strength = 'Strong';
        break;
      case 3:
        strength = 'Medium';
        break;
      default:
        strength = 'Weak';
        break;
    }

    setStrength(strength);
  };

 
  const getStrengthColor = (level) => {
    switch (level) {
      case 5: return 'green';
      case 4: return 'lightgreen';
      case 3: return 'yellow';
      case 2: return 'orange';
      case 1: return 'red';
      default: return 'lightgray'; 
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
        style={{ padding: '10px', fontSize: '16px', width: '100%' }}
      />
      <div style={{ marginTop: '10px', fontSize: '18px' }}>
        <strong>Password Strength: </strong>{strength}
      </div>
      
      
      <div style={{ height: '20px', width: '100%', backgroundColor: 'lightgray', borderRadius: '5px', marginTop: '10px' }}>
        <div
          style={{
            height: '100%',
            width: `${(strengthLevel / 5) * 100}%`,
            backgroundColor: getStrengthColor(strengthLevel),
            borderRadius: '5px',
            transition: 'width 0.5s' 
          }}
        />
      </div>
    </div>
  );
};

export default App;
