import { ClassDeclaration } from "ts-morph"

export const IsPage = <T = unknown>(c: ClassDeclaration): boolean => c.getName()?.endsWith('Page') || false
export const IsModal = <T = unknown>(c: ClassDeclaration): boolean => c.getName()!.endsWith('ModalPage') || c.getName()!.endsWith('ModalComponent') || c.getName()!.endsWith('Modal')
export const IsName = (c: ClassDeclaration, name: string): boolean => c.getName() === (name) || false

