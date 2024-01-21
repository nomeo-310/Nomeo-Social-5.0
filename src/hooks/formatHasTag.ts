const createHashTag = (value:string) => {
  if (value !== '' || value !== undefined) {
    const textArray:string[] = value.split(',').map(e => '#'+e);
    const text:string = textArray.join('');
    return text
  } return ''
}

export { createHashTag }