const inputAnimation = {
  initialState: { x: '-100vw' },
  finalState: { x: 0, type: "spring", stiffness: 200, duration: 200, delay: 1.0 }
}

const bannerAnimation = {
  initialState: { y: '-100vh' },
  finalState: { y: 0, type: "spring", stiffness: 100, duration: 100 }
}

const stepsAnimation = {
  initialState: {x: '-100vw'},
  finalState: {x:0, type: "spring", stiffness: 200, duration: 200}
}


export { inputAnimation, bannerAnimation, stepsAnimation };