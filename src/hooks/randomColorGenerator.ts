export const randomColorGenerator = () => {
  const randomCode:string = '#';
  const randomAlphaCode:number = Math.floor(Math.random()*(50 - 25 + 1)) + 25;
  const randomColorCode:string = Math.floor(Math.random()*1677215).toString(16)
  const randomColor:string = randomCode+randomColorCode+randomAlphaCode
  return randomColor
}