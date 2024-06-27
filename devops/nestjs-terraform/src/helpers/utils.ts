export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const transformReturnValueNft = (data) => {
  return data.map((returnValue) => ({
    event: returnValue.event,
    contractAddress: returnValue.address,
    lastBlock: Number(returnValue.blockNumber),
    from: returnValue.returnValues.from,
    to: returnValue.returnValues.to,
    tokenId: Number(returnValue.returnValues.tokenId),
  }));
};
