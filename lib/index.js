"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
// Define new constraint that checks the existence of sibling properties
var IsNotSiblingOfConstraint = /** @class */ (function () {
    function IsNotSiblingOfConstraint() {
    }
    IsNotSiblingOfConstraint.prototype.validate = function (value, args) {
        if (class_validator_1.isDefined(value)) {
            return this.getFailedConstraints(args).length === 0;
        }
        return true;
    };
    IsNotSiblingOfConstraint.prototype.defaultMessage = function (args) {
        return args.property + " cannot exist alongside the following defined properties: " + this.getFailedConstraints(args).join(', ');
    };
    IsNotSiblingOfConstraint.prototype.getFailedConstraints = function (args) {
        return args.constraints.filter(function (prop) {
            return class_validator_1.isDefined(args.object[prop]);
        });
    };
    IsNotSiblingOfConstraint = __decorate([
        class_validator_1.ValidatorConstraint({ async: false })
    ], IsNotSiblingOfConstraint);
    return IsNotSiblingOfConstraint;
}());
// Create Decorator for the constraint that was just created
function IsNotSiblingOf(props, validationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target, propertyName) {
        class_validator_1.registerDecorator({
            target: target.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: props,
            validator: IsNotSiblingOfConstraint,
        });
    };
}
// Helper function for determining if a prop should be validated
function incompatibleSiblingsNotPresent(incompatibleSiblings) {
    return function (o, v) {
        return Boolean(class_validator_1.isDefined(v) || // Validate if prop has value
            // Validate if all incompatible siblings are not defined
            incompatibleSiblings.every(function (prop) { return !class_validator_1.isDefined(o[prop]); }));
    };
}
function IncompatibleWith(incompatibleSiblings) {
    var notSibling = IsNotSiblingOf(incompatibleSiblings);
    var validateIf = class_validator_1.ValidateIf(incompatibleSiblingsNotPresent(incompatibleSiblings));
    return function (target, key) {
        notSibling(target, key);
        validateIf(target, key);
    };
}
exports.default = IncompatibleWith;
