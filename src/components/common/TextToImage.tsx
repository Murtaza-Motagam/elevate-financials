import { capitalizeFirstLetter } from '@/lib/common';
import React from 'react';

interface TextToImageProps {
    nameText: string | undefined;
    className?: string;
    hasSquare?: boolean;
}

const TextToImage: React.FC<TextToImageProps> = ({ nameText = '', className, hasSquare = false }) => {
    const stringArry = nameText.split(' ');
    let twoLetter =
        stringArry?.length <= 1
            ? `${nameText?.charAt(0)?.toUpperCase()}${nameText?.charAt(1)?.toUpperCase()}`
            : stringArry
                .map((dt) => dt.charAt(0)?.toUpperCase())
                .toString()
                .replaceAll(',', '');

    if (hasSquare) {
        twoLetter = twoLetter.slice(0, 2);
    }

    return (
        <p
            className={`w-10 h-10 flex items-center justify-center bg-primary rounded-ful text-lg font-bold !text-white transform cursor-pointer leading-[3rem] ${className} `}
        >
            {capitalizeFirstLetter(twoLetter)}
        </p>
    );
}

export default TextToImage;
