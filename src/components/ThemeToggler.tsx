"use client"
 

import { DarkMode, SystemDefault } from "./IconPacks";
import { LightMode } from "./IconPacks";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

type themeToggleProps = {
  className?: string
  iconStyle?:string
}

const ThemeToggler =({className, iconStyle}:themeToggleProps) =>  {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return (
    <div className={className}>
      <SystemDefault className={`lg:h-6 lg:w-6 w-5 h-5 text-black ${iconStyle}`}/>
    </div>
  )

  if (resolvedTheme === 'dark') {
    return (
      <button className={className}>
        <LightMode className={`lg:h-6 lg:w-6 w-5 h-5 text-black ${iconStyle}`} onClick={() => setTheme('light')} />
      </button>
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <button className={className}>
        <DarkMode className={`lg:h-6 lg:w-6 w-5 h-5 ${iconStyle}`} onClick={() => setTheme('dark')} />
      </button>
    )
  }

}

export default ThemeToggler