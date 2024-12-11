import React from 'react';
import '../css/homeView.css';
import Button from '../component/button';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const goToSelectionPage = () => {
      navigate('/select/step1'); // '/select1' 경로로 이동
    };

  return (
    <div className="home-container">
        <div className='main-content'>
            <div>
                오늘,
            </div>
            <div>
                나의
            </div>
            <div>
                탄소발자국은?
            </div>
        </div>

        <div className='divider'>
        </div>

        <span className='start-btn'>
            <Button label="시작하기" width="110px" height="48px" onClick={goToSelectionPage} />
        </span>
        <span className='sub-title'>
            탄소발자국 계산기
        </span>
        
    </div>
  );
}

export default Home;
