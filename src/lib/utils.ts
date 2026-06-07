import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t

export const clamp = (val: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, val))

export const mapRange = (
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin

export const formatNumber = (n: number): string =>
  n.toLocaleString('en-US')
