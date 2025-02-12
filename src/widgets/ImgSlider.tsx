'use client';

import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';

interface dataProps {
  name: string;
  src: string;
}

interface SliderProps {
  data: dataProps[];
}

const ImgSlider: React.FC<SliderProps> = ({ data = [] }) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 5, spacing: 5 },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 2, spacing: 5 },
      },
    },
  });

  return (
    <div ref={sliderRef} className='keen-slider flex items-center cursor-pointer'>
      {data.map((dt, index) => (
        <div key={index} className='keen-slider__slide flex justify-center'>
          <div className='w-36 h-16 flex items-center justify-center'>
            <Image src={dt.src} alt={dt.name} width={140} height={50} className='object-contain' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImgSlider;
