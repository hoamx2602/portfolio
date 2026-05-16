'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type ServiceCategory = 'all' | 'ai' | 'iiot' | 'rpa'

interface FilterContextType {
  activeFilter: ServiceCategory
  setActiveFilter: (filter: ServiceCategory) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>('all')

  return (
    <FilterContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}
