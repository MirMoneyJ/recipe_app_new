import React, { useState } from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-image: url('background.jpg');
  background-size: cover;
  background-position: center;
`;

const ModalContent = styled.div`
  width: 50vw; // Make the modal wider
  max-width: 500px; //
  background: white;
  padding: 40px; // Increase padding for more space inside the modal
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1001;
`;

const Input = styled.input`
  margin-top: 10px;
  border: 1px solid #ddd; 
  padding: 10px;
  width: calc(100% - 20px); 
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-top: 10px;
  background-color: #FFA07A; 
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
`;

function WelcomeModal({ onNameSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNameSubmit(name);
  };

  return (
    <Backdrop>
      <ModalContent>
        <h2>Welcome to Recipe Realm</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Button type="submit">Enter</Button>
          </div>
        </form>
      </ModalContent>
    </Backdrop>
  );
}

export default WelcomeModal;