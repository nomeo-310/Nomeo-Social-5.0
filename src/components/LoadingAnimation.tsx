import React from 'react';
import { ColorRing, ThreeCircles } from 'react-loader-spinner';

interface loadingAnimationProps {
  minHeight?: string
  spinnerSize?: string
  fixed?: boolean
}

const FullScreenLoading = ({minHeight, spinnerSize, fixed}:loadingAnimationProps):React.ReactElement => {
  return (
    <div className={`w-full bg-black/25 left-0 top-0 rounded ${minHeight ? minHeight : 'min-h-screen'} ${fixed ? 'fixed' : ''} z-[500000]`}>
      <div className={`flex justify-center items-center w-full ${minHeight ? minHeight : 'min-h-screen'}`}>
        <ThreeCircles 
          height={spinnerSize ? spinnerSize : '120'}
          width={spinnerSize ? spinnerSize : '120'}
          visible={true}
          ariaLabel='three-circles-rotating'
          outerCircleColor='#6F00FF'
          innerCircleColor='#00563B'
          middleCircleColor='#E23D28'
        />
      </div>
    </div>
  );
}

const LoadingScreen = ({minHeight, spinnerSize}:loadingAnimationProps):React.ReactElement => {
  return (
    <div className={`w-full bg-black/25 left-0 top-0 rounded ${minHeight ? minHeight : 'min-h-screen'}`}>
      <div className={`flex justify-center items-center w-full ${minHeight ? minHeight : 'min-h-screen'}`}>
      <ColorRing
        visible={true}
        height={spinnerSize}
        width={spinnerSize}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    </div>
  );
}

export { FullScreenLoading, LoadingScreen };