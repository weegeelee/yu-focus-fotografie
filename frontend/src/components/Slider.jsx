import { useCallback, useEffect, useRef, useState } from 'react';
import img1 from '../assets/home-pic/Irina-2.jpg'
import img2 from '../assets/home-pic/Irina-3.jpg'
import img3 from '../assets/home-pic/Leo-1.jpg'
import img4 from '../assets/home-pic/Xuna-2.jpg'
import img5 from '../assets/home-pic/Yifan-2.jpg'
import img6 from '../assets/home-pic/Zhangjie-1.jpg'
import './homepage.css';

export default function Slider() {
    const imgs = [img1, img2, img3, img4, img5, img6];
    const timerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextSlide = useCallback(function handleNextSlide() {
        const isLastSlide = currentIndex === imgs.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;

        setCurrentIndex(newIndex);
    }, [currentIndex, imgs]);

    function goToSlide(index) {
        setCurrentIndex(index);
    }

    useEffect(() => {
        timerRef.current = setInterval(() => {
            handleNextSlide();
        }, 6000);

        return () => clearInterval(timerRef.current)
    }, [handleNextSlide])

    return (
        <div className='carousel'>
            <ul>
                {imgs.map((img, index) => (
                    <li key={index}><img src={img} className={currentIndex === index ? 'slide' : 'slide slide-hidden' } loading="lazy" /></li>))}
            </ul>
            <span className='dots'>
                {imgs.map((_, index) => {
                    return (
                        <button key={index} onClick={() => goToSlide(index)} className={currentIndex === index ? 'dot dot-action' : 'dot'}></button>);
                })}
            </span>
        </div>
    );
}