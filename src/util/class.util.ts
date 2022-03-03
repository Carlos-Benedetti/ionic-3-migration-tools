import { ClassDeclaration } from "ts-morph"

export const IsPage = <T = unknown>(c: ClassDeclaration): boolean => (c.getName()?.endsWith('Page') || false) && (!(c.getName()!.includes('Modal')) || false)
export const IsName = (c: ClassDeclaration, name: string): boolean => c.getName() === (name) || false

