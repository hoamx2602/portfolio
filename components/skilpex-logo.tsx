import Image from 'next/image'

export function SkilpexLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/side-logo.svg"
      alt="Skilpex logo"
      width={387}
      height={164}
      className={className}
      priority
    />
  )
}
