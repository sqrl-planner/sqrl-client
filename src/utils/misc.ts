export type Optional<T> = T | undefined // I'm pretty sure this exists somewhere and can't find it

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
