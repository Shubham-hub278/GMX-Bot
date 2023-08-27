import { Finding, FindingSeverity, ethers, FindingType } from "forta-agent";


export const createFinding = (
  account: string,
  updateKey: string,
  increaseKey: string,
  size: ethers.BigNumber,
  sizeDelta: ethers.BigNumber
): Finding => {
    return Finding.fromObject({
      name: "Large position size opened on GMX's Vault Contract",
      description: "UpdatePosition event emitted with a large position size",
      alertId: "GMX-1",
      severity: FindingSeverity.Info,
      type: FindingType.Info,
      protocol: "GMX",
      metadata: {
        account: account,
        positionSize: sizeDelta.toString(),
        positionKey: updateKey,
      },
    });
}