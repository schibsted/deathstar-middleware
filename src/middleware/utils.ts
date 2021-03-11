export const sleep = async (ms: number) => {
  // eslint-disable-next-line promise/avoid-new
  await new Promise((resolve) => setTimeout(resolve, ms));
};
