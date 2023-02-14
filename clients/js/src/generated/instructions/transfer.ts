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
  publicKey,
} from '@metaplex-foundation/umi-core';
import { findMetadataPda } from '../accounts';
import {
  TransferArgs,
  TransferArgsArgs,
  getTransferArgsSerializer,
} from '../types';

// Accounts.
export type TransferInstructionAccounts = {
  /** Token account */
  token: PublicKey;
  /** Token account owner */
  tokenOwner: PublicKey;
  /** Destination token account */
  destination: PublicKey;
  /** Destination token account owner */
  destinationOwner: PublicKey;
  /** Mint of token asset */
  mint: PublicKey;
  /** Metadata (pda of ['metadata', program id, mint id]) */
  metadata?: PublicKey;
  /** Edition of token asset */
  edition?: PublicKey;
  /** Owner token record account */
  ownerTokenRecord?: PublicKey;
  /** Destination token record account */
  destinationTokenRecord?: PublicKey;
  /** Transfer authority (token owner or delegate) */
  authority?: Signer;
  /** Payer */
  payer?: Signer;
  /** System Program */
  systemProgram?: PublicKey;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey;
  /** SPL Token Program */
  splTokenProgram?: PublicKey;
  /** SPL Associated Token Account program */
  splAtaProgram?: PublicKey;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey;
};

// Arguments.
export type TransferInstructionData = {
  discriminator: number;
  transferArgs: TransferArgs;
};

export type TransferInstructionArgs = { transferArgs: TransferArgsArgs };

export function getTransferInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<TransferInstructionArgs, TransferInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    TransferInstructionArgs,
    TransferInstructionData,
    TransferInstructionData
  >(
    s.struct<TransferInstructionData>(
      [
        ['discriminator', s.u8],
        ['transferArgs', getTransferArgsSerializer(context)],
      ],
      'TransferInstructionArgs'
    ),
    (value) => ({ ...value, discriminator: 49 } as TransferInstructionData)
  ) as Serializer<TransferInstructionArgs, TransferInstructionData>;
}

// Instruction.
export function transfer(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: TransferInstructionAccounts & TransferInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;

  // Resolved accounts.
  const tokenAccount = input.token;
  const tokenOwnerAccount = input.tokenOwner;
  const destinationAccount = input.destination;
  const destinationOwnerAccount = input.destinationOwner;
  const mintAccount = input.mint;
  const metadataAccount =
    input.metadata ??
    findMetadataPda(context, { mint: publicKey(mintAccount) });
  const editionAccount = input.edition ?? { ...programId, isWritable: false };
  const ownerTokenRecordAccount = input.ownerTokenRecord ?? {
    ...programId,
    isWritable: false,
  };
  const destinationTokenRecordAccount = input.destinationTokenRecord ?? {
    ...programId,
    isWritable: false,
  };
  const authorityAccount = input.authority ?? context.identity;
  const payerAccount = input.payer ?? context.payer;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };
  const sysvarInstructionsAccount =
    input.sysvarInstructions ??
    publicKey('Sysvar1nstructions1111111111111111111111111');
  const splTokenProgramAccount = input.splTokenProgram ?? {
    ...context.programs.get('splToken').publicKey,
    isWritable: false,
  };
  const splAtaProgramAccount = input.splAtaProgram ?? {
    ...context.programs.get('splAssociatedToken').publicKey,
    isWritable: false,
  };
  const authorizationRulesProgramAccount = input.authorizationRulesProgram ?? {
    ...programId,
    isWritable: false,
  };
  const authorizationRulesAccount = input.authorizationRules ?? {
    ...programId,
    isWritable: false,
  };

  // Token.
  keys.push({
    pubkey: tokenAccount,
    isSigner: false,
    isWritable: isWritable(tokenAccount, true),
  });

  // Token Owner.
  keys.push({
    pubkey: tokenOwnerAccount,
    isSigner: false,
    isWritable: isWritable(tokenOwnerAccount, false),
  });

  // Destination.
  keys.push({
    pubkey: destinationAccount,
    isSigner: false,
    isWritable: isWritable(destinationAccount, true),
  });

  // Destination Owner.
  keys.push({
    pubkey: destinationOwnerAccount,
    isSigner: false,
    isWritable: isWritable(destinationOwnerAccount, false),
  });

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, false),
  });

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Edition.
  keys.push({
    pubkey: editionAccount,
    isSigner: false,
    isWritable: isWritable(editionAccount, false),
  });

  // Owner Token Record.
  keys.push({
    pubkey: ownerTokenRecordAccount,
    isSigner: false,
    isWritable: isWritable(ownerTokenRecordAccount, true),
  });

  // Destination Token Record.
  keys.push({
    pubkey: destinationTokenRecordAccount,
    isSigner: false,
    isWritable: isWritable(destinationTokenRecordAccount, true),
  });

  // Authority.
  signers.push(authorityAccount);
  keys.push({
    pubkey: authorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(authorityAccount, false),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Sysvar Instructions.
  keys.push({
    pubkey: sysvarInstructionsAccount,
    isSigner: false,
    isWritable: isWritable(sysvarInstructionsAccount, false),
  });

  // Spl Token Program.
  keys.push({
    pubkey: splTokenProgramAccount,
    isSigner: false,
    isWritable: isWritable(splTokenProgramAccount, false),
  });

  // Spl Ata Program.
  keys.push({
    pubkey: splAtaProgramAccount,
    isSigner: false,
    isWritable: isWritable(splAtaProgramAccount, false),
  });

  // Authorization Rules Program.
  keys.push({
    pubkey: authorizationRulesProgramAccount,
    isSigner: false,
    isWritable: isWritable(authorizationRulesProgramAccount, false),
  });

  // Authorization Rules.
  keys.push({
    pubkey: authorizationRulesAccount,
    isSigner: false,
    isWritable: isWritable(authorizationRulesAccount, false),
  });

  // Data.
  const data = getTransferInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
