import React from 'react'

interface Props {
  background?: string
  overflow?: boolean
  borderRadius?: string
  noShadow?: boolean
  noPadding?: boolean
  noBottomMargin?: boolean
  children: React.ReactNode
  centerContent?: boolean
  fullHeight?: boolean
  fullWidth?: string
}

const CardComponent = ({background, overflow, borderRadius, noShadow, noPadding, noBottomMargin, children, centerContent, fullHeight, fullWidth}: Props):React.ReactElement => {
  return (
    <div className={`${background ? background : 'bg-white dark:bg-[#3d3d3d]'} ${overflow ? '' : 'overflow-hidden'} ${fullWidth ? fullWidth : 'w-full'} ${fullHeight ? 'h-full' : ''} ${borderRadius ? borderRadius : 'rounded'} ${noShadow ? '' : 'shadow-md'} ${noPadding ? 'p-0' : 'lg:p-3 p-2'} ${noBottomMargin ? '' : 'mb-3'} ${centerContent ? 'flex justify-center items-center' : ''}`} style={{backgroundColor: background ? background : '#fffff'}}>
      {children}
    </div>
  )
}

export default CardComponent
