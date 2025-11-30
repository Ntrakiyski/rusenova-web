import { TypographyStyle } from '@/types/project'

export function weightToken(weight: TypographyStyle['weight']): string {
  return weight
}

export function fontClass(style?: TypographyStyle): string {
  if (!style) return ''
  return `font-['${style.font}:${weightToken(style.weight)}',sans-serif]`
}

export function sizeClass(style?: TypographyStyle): string {
  if (!style) return ''
  const parts: string[] = []
  if (style.size.base) parts.push(`text-[${style.size.base}px]`)
  if (style.size.md) parts.push(`md:text-[${style.size.md}px]`)
  if (style.size.lg) parts.push(`lg:text-[${style.size.lg}px]`)
  return parts.join(' ')
}

export function typoClass(style?: TypographyStyle): string {
  return [fontClass(style), sizeClass(style)].filter(Boolean).join(' ')
}
