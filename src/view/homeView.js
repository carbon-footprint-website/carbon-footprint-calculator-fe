import React from 'react';
import '../css/homeView.css';
import Button from '../component/button';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const goToSelectionPage = () => {
      navigate('/select'); // '/select1' 경로로 이동
    };

  return (
    <div className="home-container">
        <div className='main-content'>
            <div className='home-text-container'>
                오늘,
            </div>
            <div className='home-text-container'>
                나의
            </div>
            <div className='home-text-container'>
                탄소발자국은 ?
            </div>
        </div>

        <div className='divider'>
        </div>

        <span className='start-btn'>
            <Button label="시작하기" width="9vw" height="6.6vh" fontSize={"max(20px,1.5vw)"} onClick={goToSelectionPage} />
        </span>
        <span className='sub-title'>
            탄소발자국 계산기
        </span>
        
    </div>
  );
}

export default Home;
