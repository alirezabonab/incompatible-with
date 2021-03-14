"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_transformer_validator_1 = require("class-transformer-validator");
var class_validator_1 = require("class-validator");
var index_1 = __importDefault(require("./index"));
var UpdateUserDTO = /** @class */ (function () {
    function UpdateUserDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        index_1.default(['deleted'])
    ], UpdateUserDTO.prototype, "status", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        index_1.default(['status'])
    ], UpdateUserDTO.prototype, "deleted", void 0);
    __decorate([
        class_validator_1.IsString()
    ], UpdateUserDTO.prototype, "name", void 0);
    return UpdateUserDTO;
}());
describe('IncompatibleWith decorator', function () {
    it('throws if sibling is defined in the object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    obj = {
                        status: 'test',
                        deleted: true,
                        name: 'john',
                    };
                    return [4 /*yield*/, expect(class_transformer_validator_1.transformAndValidate(UpdateUserDTO, obj)).rejects.toEqual([
                            {
                                children: [],
                                constraints: {
                                    IsNotSiblingOfConstraint: 'status cannot exist alongside the following defined properties: deleted',
                                },
                                property: 'status',
                                target: { deleted: true, name: 'john', status: 'test' },
                                value: 'test',
                            },
                            {
                                children: [],
                                constraints: {
                                    IsNotSiblingOfConstraint: 'deleted cannot exist alongside the following defined properties: status',
                                },
                                property: 'deleted',
                                target: { deleted: true, name: 'john', status: 'test' },
                                value: true,
                            },
                        ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns the class if one of keys exist on the object', function () { return __awaiter(void 0, void 0, void 0, function () {
        var objWithoutStatus, result, objWithoutDeleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    objWithoutStatus = {
                        deleted: true,
                        name: 'john',
                    };
                    return [4 /*yield*/, class_transformer_validator_1.transformAndValidate(UpdateUserDTO, objWithoutStatus)];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(objWithoutStatus);
                    expect(result).toBeInstanceOf(UpdateUserDTO);
                    objWithoutDeleted = {
                        status: 'test',
                        name: 'john',
                    };
                    return [4 /*yield*/, class_transformer_validator_1.transformAndValidate(UpdateUserDTO, objWithoutDeleted)];
                case 2:
                    result = _a.sent();
                    expect(result).toEqual(objWithoutDeleted);
                    expect(result).toBeInstanceOf(UpdateUserDTO);
                    return [2 /*return*/];
            }
        });
    }); });
});
