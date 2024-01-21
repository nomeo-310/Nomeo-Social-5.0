const testEmailInput =(value:string)=> {
  const emailExpression:RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const newValue = emailExpression.test(value);
  return newValue
}

const testPasswordInput =(value:string)=> {
  const passwordExpression:RegExp = /^(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#$%&?].*).{8,}/
  const newValue = passwordExpression.test(value);
  return newValue
}

const testPhoneNumberInput = (value:string)=> {
  const firstFourDigits = value.slice(0,4);
  const mobileNumberStartValues = [
    '0701', '0703', '0704', '0705', '0706', '0707', '0708', '0802','0803','0804','0805','0806','0807','0808','0809','0810','0811','0812','0813',
    '0814','0815','0816','0817','0818','0819','0909','0908','0901','0902','0903','0904','0905','0906','0907','0915','0913','0912','0916','0911'];
    const validation = value.length === 11 && mobileNumberStartValues.includes(firstFourDigits) && !Number.isNaN(Number(value));
  return validation;
}

export { testEmailInput, testPasswordInput, testPhoneNumberInput }