import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface LazyImgProps {
    alt?: string;
    src: string;
    className?: string;
    width?: number;
    height?: number;
    rest?: any;
}

const LazyLoadImg: React.FC<LazyImgProps> = ({ alt, src, className, height, width, ...rest}) => {
    return (
        <LazyLoadImage
            alt={alt}
            src={src}
            className={className}
            height={height}
            width={width}
            {...rest}
        />
    )
}

export default LazyLoadImg
