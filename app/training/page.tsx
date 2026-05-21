'use client'

import { LanguageProvider } from '@/components/language-context'
import { FilterProvider } from '@/components/filter-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { TrainingSection } from '@/components/training-section'
import { useEffect } from 'react'

export default function TrainingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LanguageProvider>
      <FilterProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1 pt-24">
            <TrainingSection isFullPage={true} />
          </main>
          <Footer />
        </div>
      </FilterProvider>
    </LanguageProvider>
  )
}
