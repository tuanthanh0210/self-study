export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const transformReturnValueNft = (data) => {
  return data.map((returnValue) => ({
    blockHash: returnValue.blockHash,
    transactionHash: returnValue.transactionHash,
    event: returnValue.event,
    contractAddress: returnValue.address,
    blockNumber: Number(returnValue.blockNumber),
    fromAddress: returnValue.returnValues.from,
    toAddress: returnValue.returnValues.to,
    tokenId: Number(returnValue.returnValues.tokenId),
  }));
};
