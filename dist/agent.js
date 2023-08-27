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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideTransactionHandler = exports.initialize = void 0;
var forta_agent_1 = require("forta-agent");
var utils_1 = require("./utils");
var config_1 = require("./config");
var trader_config_1 = require("./trader-config");
var initialize = function (provider) {
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var chainId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider.getNetwork()];
                case 1:
                    chainId = (_a.sent()).chainId;
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.initialize = initialize;
var provideTransactionHandler = function (whaleTraders) {
    return function (txEvent) { return __awaiter(void 0, void 0, void 0, function () {
        var findings, eventLogs;
        return __generator(this, function (_a) {
            findings = [];
            eventLogs = txEvent.filterLog([config_1.INCREASE_POSITION_EVENT, config_1.UPDATE_POSITION_EVENT], "");
            eventLogs.forEach(function (eventLog, index) {
                if (eventLog.name === "IncreasePosition") {
                    var increaseEventLog = eventLogs[index];
                    var updateEventLog = eventLogs[index + 1];
                    var _a = increaseEventLog.args, increaseKey_1 = _a.key, sizeDelta_1 = _a.sizeDelta, collateralDelta = _a.collateralDelta, indexToken = _a.indexToken, collateralToken = _a.collateralToken, isLong = _a.isLong, account_1 = _a.account;
                    var _b = updateEventLog.args, updateKey_1 = _b.key, size_1 = _b.size;
                    // compare increasePosition and updatePosition keys
                    if (increaseKey_1 === updateKey_1) {
                        whaleTraders.map(function (traderAddress) {
                            if (account_1.toLowerCase() == traderAddress.toLowerCase()) {
                                if (size_1.eq(sizeDelta_1))
                                    findings.push((0, utils_1.createFinding)(account_1, updateKey_1, increaseKey_1, size_1, sizeDelta_1));
                            }
                        });
                    }
                }
            });
            return [2 /*return*/, findings];
        });
    }); };
};
exports.provideTransactionHandler = provideTransactionHandler;
exports.default = {
    handleTransaction: (0, exports.provideTransactionHandler)(trader_config_1.whaleTraders),
    initialize: (0, exports.initialize)((0, forta_agent_1.getEthersProvider)()),
};