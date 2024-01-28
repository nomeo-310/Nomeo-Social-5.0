export const timeFormatter = (date:Date) => {
  if (date as Date) {
    const newDate = new Date(date);
    const dateValue = newDate.getDate()
    const month = newDate.getMonth()
    let hour = newDate.getHours();
    const minute = newDate.getMinutes();
    const minutes = minute.toString().padStart(2, "0");
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const ampm = hour >= 12 ? "PM" : "AM";
  
    hour = hour % 12;
    hour = hour ? hour : 12;
  
   const formatedTimeString = dateValue + ' ' + months[month] + ' ' + 'at' + ' ' + hour + ":" + minutes + " " + ampm;
   return formatedTimeString;
  }
};