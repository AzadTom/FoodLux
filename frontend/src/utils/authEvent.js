let tokenExpiredHandler = null;

export const registerTokenExpiredHandler = (handler) => {
  tokenExpiredHandler = handler;
  return () => {
    tokenExpiredHandler = null;
  };
};

export const notifyTokenExpired = () => {
  tokenExpiredHandler?.();
};