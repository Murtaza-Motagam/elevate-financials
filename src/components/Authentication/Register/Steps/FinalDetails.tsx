import React from 'react'

interface FinalDetailsProps {
    activeStep: number;
}


const FinalDetails: React.FC<FinalDetailsProps> = ({ activeStep }) => {
    return (
        <div>
            FinalDetails {activeStep}
        </div>
    )
}

export default FinalDetails
