import React, { createContext, useState } from 'react'

export const IsRenderingContext = createContext(true)

export const IsRenderingProvider = ({ children }) => {
  const [isRendering, setIsRendering] = useState(true)

  return (
    <IsRenderingContext.Provider value={{ isRendering, setIsRendering }}>
      {children}
    </IsRenderingContext.Provider>
  )
}
