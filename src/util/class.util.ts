import { ClassDeclaration } from "ts-morph"
import { ComponentType } from '@angular/cdk/overlay'; 

export const IsPage = <T=unknown>(c: ClassDeclaration): boolean => c.getName()?.includes('Page') || false
export const IsName = (c: ClassDeclaration, name: string): boolean => c.getName() === (name) || false

