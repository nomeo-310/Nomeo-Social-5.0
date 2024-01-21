export const birthayGenerator = (birthday:string) => {
  if (birthday === '') {
    return birthday
  } else {
    const birthDate:Date = new Date(birthday);
    const month:number = birthDate.getMonth();
    const months:string[] = ['January', 'February', 'March', 'April', 'May', 'june', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date:number = birthDate.getDate();
  
    if (date === 1 || date === 21 || date === 31) {
      return date + 'st' + ' ' + months[month];
    } else if (date === 2 || date === 22) {
      return date + 'nd' + ' ' + months[month];
    } else if (date === 3 || date === 23) {
      return  date + 'rd' + ' ' + months[month];
    } else {
      return date + 'th' + ' ' + months[month];
    }
  }
}