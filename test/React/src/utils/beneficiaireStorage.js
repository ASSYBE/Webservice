export const storeBeneficiaireData = (beneficiaire) => {
    sessionStorage.setItem('beneficiaire', JSON.stringify(beneficiaire));
};

export const getBeneficiaireData = () => {
    const beneficiaire = sessionStorage.getItem('beneficiaire');
    return beneficiaire ? JSON.parse(beneficiaire) : null;
};

export const removeBeneficiaireData = () => {
    sessionStorage.removeItem('beneficiaire');
};