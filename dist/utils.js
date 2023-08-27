"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFinding = void 0;
var forta_agent_1 = require("forta-agent");
var createFinding = function (account, updateKey, increaseKey, size, sizeDelta) {
    return forta_agent_1.Finding.fromObject({
        name: "Large position size opened on GMX's Vault Contract",
        description: "UpdatePosition event emitted with a large position size",
        alertId: "GMX-1",
        severity: forta_agent_1.FindingSeverity.Info,
        type: forta_agent_1.FindingType.Info,
        protocol: "GMX",
        metadata: {
            account: account,
            positionSize: sizeDelta.toString(),
            positionKey: updateKey,
        },
    });
};
exports.createFinding = createFinding;
