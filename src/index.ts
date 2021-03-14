import {
  isDefined,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidateIf,
} from 'class-validator';

// Define new constraint that checks the existence of sibling properties
@ValidatorConstraint({ async: false })
class IsNotSiblingOfConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    if (isDefined(value)) {
      return this.getFailedConstraints(args).length === 0;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${
      args.property
    } cannot exist alongside the following defined properties: ${this.getFailedConstraints(
      args,
    ).join(', ')}`;
  }

  getFailedConstraints(args: ValidationArguments) {
    return args.constraints.filter((prop: string) => {
      return isDefined((args.object as { [k: string]: unknown })[prop]);
    });
  }
}

// Create Decorator for the constraint that was just created
function IsNotSiblingOf<T extends { [key: string]: unknown }>(
  props: string[],
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: T, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: props,
      validator: IsNotSiblingOfConstraint,
    });
  };
}

// Helper function for determining if a prop should be validated
function incompatibleSiblingsNotPresent(incompatibleSiblings: string[]) {
  return function <T extends { [key: string]: unknown }, K extends keyof T>(
    o: T,
    v: K,
  ) {
    return Boolean(
      isDefined(v) || // Validate if prop has value
        // Validate if all incompatible siblings are not defined
        incompatibleSiblings.every((prop) => !isDefined(o[prop])),
    );
  };
}

export default function IncompatibleWith(incompatibleSiblings: string[]) {
  const notSibling = IsNotSiblingOf(incompatibleSiblings);
  const validateIf = ValidateIf(
    incompatibleSiblingsNotPresent(incompatibleSiblings),
  );
  return function <T = unknown>(target: T, key: string) {
    notSibling((target as unknown) as { [key: string]: unknown }, key);
    validateIf(target, key);
  };
}
