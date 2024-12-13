import React from 'react'

interface BankingPreferenceProps {
    activeStep: number;
    onNext?: () => void;
}


const BankingPreference: React.FC<BankingPreferenceProps> = ({ activeStep, onNext }) => {
    return (
        <div>
            BankingPreference {activeStep}
        </div>
    )
}

export default BankingPreference
