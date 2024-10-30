// FOR NOW THIS WORKS BUT DO NOT ASSUME THAT THESE OPCODES ARE UNIQUE.
// THREE OF THEM ARE NOT
// fuckin couldnt get it to work well but hey it works 😁
export const RegisterModeInstructions: any = [];

const registers = ["A", "B", "C", "D", "E", "H", "L"];

const baseOpcode = 0x80;

registers.forEach((srcRegister) => {
  registers.forEach((destRegister) => {
    if (srcRegister !== destRegister) {
      const uniqueOpcode = (
        baseOpcode +
        registers.indexOf(srcRegister) * 10 +
        registers.indexOf(destRegister)
      )
        .toString(16)
        .toUpperCase();

      RegisterModeInstructions.push({
        opcode: uniqueOpcode,
        mnemonic: `MOV ${destRegister}, ${srcRegister}`,
        description: `Move data from register ${srcRegister} to register ${destRegister}.`,
        bytes: 1,
        operands: [],
      });
    }
  });
});
