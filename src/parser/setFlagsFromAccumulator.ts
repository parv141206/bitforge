const setFlagsFromAccumulator = (AHex: string): any => {
  const A = parseInt(AHex, 16);

  return {
    Z: A === 0,
    S: (A & 0x80) !== 0,
    P: (A & 0x01) === 0,
    C: A > 0xff,
    AC: (A & 0x0f) > 0x0f,
  };
};
