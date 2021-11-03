"use strict";
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
exports.deleteUser = exports.deletePreUser = exports.validUser = exports.validPreUser = exports.getCredits = exports.inexistingPreUser = exports.inexistingUser = exports.putUser = exports.putPreUser = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var dynamodb_1 = require("aws-sdk/clients/dynamodb");
var documentClient = new dynamodb_1.DocumentClient({
    region: process.env.REGION,
    accessKeyId: process.env.AccessKeyID,
    secretAccessKey: process.env.SecretAccessKey
});
var TABLE_NAME_PRE_USER = "pre-users-caballero";
var TABLE_NAME_USER = "users-caballero";
function putPreUser(preUser) {
    var params = {
        TableName: TABLE_NAME_PRE_USER,
        Item: preUser
    };
    documentClient.put(params).promise();
}
exports.putPreUser = putPreUser;
function putUser(user) {
    var params = {
        TableName: TABLE_NAME_USER,
        Item: user
    };
    documentClient.put(params).promise();
}
exports.putUser = putUser;
function inexistingUser(email) {
    return __awaiter(this, void 0, void 0, function () {
        var params, myData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        ExpressionAttributeNames: {
                            "#E": "email"
                        },
                        ExpressionAttributeValues: {
                            ":a": email
                        },
                        FilterExpression: "#E = :a",
                        ProjectionExpression: "#E",
                        TableName: TABLE_NAME_USER
                    };
                    return [4 /*yield*/, documentClient.scan(params).promise()];
                case 1:
                    myData = _a.sent();
                    return [2 /*return*/, myData["Count"] === 0];
            }
        });
    });
}
exports.inexistingUser = inexistingUser;
function inexistingPreUser(email) {
    return __awaiter(this, void 0, void 0, function () {
        var params, myData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        ExpressionAttributeNames: {
                            "#E": "email"
                        },
                        ExpressionAttributeValues: {
                            ":a": email
                        },
                        FilterExpression: "#E = :a",
                        ProjectionExpression: "#E",
                        TableName: TABLE_NAME_PRE_USER
                    };
                    return [4 /*yield*/, documentClient.scan(params).promise()];
                case 1:
                    myData = _a.sent();
                    return [2 /*return*/, myData["Count"] === 0];
            }
        });
    });
}
exports.inexistingPreUser = inexistingPreUser;
function getPreUser(email, id) {
    return __awaiter(this, void 0, void 0, function () {
        var params, myData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        TableName: TABLE_NAME_PRE_USER,
                        Key: {
                            id: id,
                            email: email
                        }
                    };
                    return [4 /*yield*/, documentClient.get(params, function (err, data) {
                            if (err)
                                console.log(err);
                        }).promise()];
                case 1:
                    myData = _a.sent();
                    return [2 /*return*/, myData];
            }
        });
    });
}
function getUser(email, id) {
    return __awaiter(this, void 0, void 0, function () {
        var params, myData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        TableName: TABLE_NAME_USER,
                        Key: {
                            id: id,
                            email: email
                        }
                    };
                    return [4 /*yield*/, documentClient.get(params, function (err, data) {
                            if (err)
                                console.log(err);
                        }).promise()];
                case 1:
                    myData = _a.sent();
                    return [2 /*return*/, myData];
            }
        });
    });
}
function getCredits(email, id) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var params, myData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    params = {
                        TableName: TABLE_NAME_USER,
                        Key: {
                            id: id,
                            email: email
                        }
                    };
                    return [4 /*yield*/, documentClient.get(params, function (err, data) {
                            if (err)
                                console.log(err);
                        }).promise()];
                case 1:
                    myData = _b.sent();
                    return [2 /*return*/, (_a = myData === null || myData === void 0 ? void 0 : myData.Item) === null || _a === void 0 ? void 0 : _a.credits];
            }
        });
    });
}
exports.getCredits = getCredits;
function validPreUser(email, id) {
    return __awaiter(this, void 0, void 0, function () {
        var myData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((email === '') || (id === ''))) return [3 /*break*/, 1];
                    return [2 /*return*/, false];
                case 1: return [4 /*yield*/, getPreUser(email, id)];
                case 2:
                    myData = _a.sent();
                    return [2 /*return*/, (Object.keys(myData).length !== 0)];
            }
        });
    });
}
exports.validPreUser = validPreUser;
function validUser(email, id) {
    return __awaiter(this, void 0, void 0, function () {
        var myData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((email === '') || (id === ''))) return [3 /*break*/, 1];
                    return [2 /*return*/, false];
                case 1: return [4 /*yield*/, getUser(email, id)];
                case 2:
                    myData = _a.sent();
                    return [2 /*return*/, (Object.keys(myData).length !== 0)];
            }
        });
    });
}
exports.validUser = validUser;
function deletePreUser(email, id) {
    var params = {
        TableName: TABLE_NAME_PRE_USER,
        Key: {
            id: id,
            email: email
        }
    };
    documentClient.delete(params).promise();
}
exports.deletePreUser = deletePreUser;
function deleteUser(email, id) {
    var params = {
        TableName: TABLE_NAME_USER,
        Key: {
            id: id,
            email: email
        }
    };
    documentClient.delete(params).promise();
}
exports.deleteUser = deleteUser;
