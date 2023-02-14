/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
} from '@metaplex-foundation/umi-core';
import { PuffRuleSetArgs, getPuffRuleSetArgsSerializer } from '../types';

// Accounts.
export type PuffRuleSetInstructionAccounts = {
  /** Payer and creator of the RuleSet */
  payer?: Signer;
  /** The PDA account where the RuleSet is stored */
  ruleSetPda: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
};

// Arguments.
export type PuffRuleSetInstructionData = {
  discriminator: number;
  puffRuleSetArgs: PuffRuleSetArgs;
};

export type PuffRuleSetInstructionArgs = { puffRuleSetArgs: PuffRuleSetArgs };

export function getPuffRuleSetInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<PuffRuleSetInstructionArgs, PuffRuleSetInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    PuffRuleSetInstructionArgs,
    PuffRuleSetInstructionData,
    PuffRuleSetInstructionData
  >(
    s.struct<PuffRuleSetInstructionData>(
      [
        ['discriminator', s.u8],
        ['puffRuleSetArgs', getPuffRuleSetArgsSerializer(context)],
      ],
      'PuffRuleSetInstructionArgs'
    ),
    (value) => ({ ...value, discriminator: 3 } as PuffRuleSetInstructionData)
  ) as Serializer<PuffRuleSetInstructionArgs, PuffRuleSetInstructionData>;
}

// Instruction.
export function puffRuleSet(
  context: Pick<Context, 'serializer' | 'programs' | 'payer'>,
  input: PuffRuleSetInstructionAccounts & PuffRuleSetInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenAuthRules').publicKey;

  // Resolved accounts.
  const payerAccount = input.payer ?? context.payer;
  const ruleSetPdaAccount = input.ruleSetPda;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // Rule Set Pda.
  keys.push({
    pubkey: ruleSetPdaAccount,
    isSigner: false,
    isWritable: isWritable(ruleSetPdaAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Data.
  const data =
    getPuffRuleSetInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
