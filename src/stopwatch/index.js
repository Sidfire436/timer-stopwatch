import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StopwatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Stopwatch = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #333;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;

function StopwatchComponent() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timeInterval = null;
        if (isActive) {
            timeInterval = setInterval(() => {
                setElapsedTime(time => time + 1);
            }, 10);
        } else if (!isActive && elapsedTime !== 0) {
            clearInterval(timeInterval);
        }
        return () => clearInterval(timeInterval);
    }, [isActive, elapsedTime]);

    const handleReset = () => {
        setElapsedTime(0);
        setIsActive(false);
    };


    const hours = Math.floor(elapsedTime / 360000);
    const minutes = Math.floor((elapsedTime % 360000) / 6000);
    const seconds = Math.floor((elapsedTime % 6000) / 100);
    const milliseconds = Math.floor(elapsedTime % 100);

    return (
        <StopwatchContainer>
            <h1>Stopwatch</h1>
            <Stopwatch>
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}:
                {milliseconds.toString().padStart(2, '0')}
            </Stopwatch>
            <div>
                {!isActive && (
                    <Button onClick={() => setIsActive(true)}>Start</Button>
                )}
                {isActive && (
                    <Button onClick={() => setIsActive(false)}>Stop</Button>
                )}
                <Button onClick={handleReset}>Reset</Button>
            </div>
        </StopwatchContainer>
    );
}

export default StopwatchComponent;