import React, { createContext, useState } from 'react'

export const IsRenderingContext = createContext(false)

export const IsRenderingProvider = ({ children }) => {
  const [isRendering, setIsRendering] = useState(false)

  return (
    <IsRenderingContext.Provider value={{ isRendering, setIsRendering }}>
      {children}
    </IsRenderingContext.Provider>
  )
}
