import { KEYS } from '@/lib/constant';
import { LocalStorage } from '@/lib/localStorage';

const useRegister = () => {
  const getPersonalDetails = LocalStorage.getJSON(KEYS.personalDetails);
  const getDocumentDetails = LocalStorage.getJSON(KEYS.documentDetails);
  const getBankingDetails = LocalStorage.getJSON(KEYS.bankingDetails);

  return {
    getPersonalDetails,
    getDocumentDetails,
    getBankingDetails,
  };
};

export default useRegister;
