import { ValidateIf } from 'class-validator'
import type { ValidationOptions } from 'class-validator'

export function IsOptionalWithEmptyString(
  validationOptions?: ValidationOptions,
) {
  return ValidateIf((_, value) => {
    return value !== null && value !== undefined && value !== ''
  }, validationOptions)
}
