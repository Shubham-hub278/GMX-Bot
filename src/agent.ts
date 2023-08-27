import { Finding, getEthersProvider, HandleTransaction, LogDescription, TransactionEvent } from "forta-agent";
import { providers } from "ethers";
import { createFinding } from "./utils";
import { INCREASE_POSITION_EVENT, UPDATE_POSITION_EVENT, PRICE_PRECISION, VAULT } from "./config";
import { whaleTraders } from "./trader-config";

export const initialize = (provider: providers.Provider) => {
  return async () => {
    const { chainId } = await provider.getNetwork();

  };
};

export const provideTransactionHandler = (whaleTraders: string[]): HandleTransaction => {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    const findings: Finding[] = [];

    // filter transaction logs for increase and update position events
    const eventLogs: LogDescription[] = txEvent.filterLog(
      [INCREASE_POSITION_EVENT, UPDATE_POSITION_EVENT],
      ""
    );

    eventLogs.forEach((eventLog, index) => {
      if (eventLog.name === "IncreasePosition") {
        const increaseEventLog = eventLogs[index];
        const updateEventLog = eventLogs[index + 1];

        const { key: increaseKey, sizeDelta, collateralDelta, indexToken, collateralToken, isLong,  account } = increaseEventLog.args;
        const { key: updateKey, size } = updateEventLog.args;
        // compare increasePosition and updatePosition keys
        if (increaseKey === updateKey) {
          whaleTraders.map(traderAddress => {
            if(account.toLowerCase() == traderAddress.toLowerCase()){
              if(size.eq(sizeDelta))
                findings.push(createFinding(account, updateKey, increaseKey, size, sizeDelta));
          }
          })
        }
      }
    });

    return findings;
  };
};



export default {
  handleTransaction: provideTransactionHandler(whaleTraders),
  initialize: initialize(getEthersProvider()),
};