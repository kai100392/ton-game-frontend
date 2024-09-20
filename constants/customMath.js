export const convertToUint8 = (value) => {
  // Ensures the value stays within 0-255
  return value % 256;
};
