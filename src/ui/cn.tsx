import { clsx, type ClassValue } from 'clsx'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cnp(props: { className?: string }, ...inputs: any) {
  return cn(...inputs, props.className)
}

