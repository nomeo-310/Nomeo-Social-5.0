export const ageCalculator = (birthday:string) => {
  if (birthday) {
    const today:Date = new Date();
    const birthDate = new Date(birthday);
  
    let calculatedAge:number = today.getFullYear() - birthDate.getFullYear();
  
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth()) 
      && today.getDate() < birthDate.getDate()) {
      calculatedAge--
    } else {
      calculatedAge;
    }
    return calculatedAge;
  } else return 
}

