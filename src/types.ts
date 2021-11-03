import { EntityID } from './types/entity_id';
import { Winston } from './types/winston';

export const ArFS_O_11 = '0.11';
export const CURRENT_ARFS_VERSION = ArFS_O_11;
export const DEFAULT_APP_NAME = 'ArDrive-Core';
export const DEFAULT_APP_VERSION = '1.0.0';

export type PublicKey = string;
export type SeedPhrase = string;

export type NetworkReward = Winston;

export type FolderID = EntityID;
export type FileID = EntityID;
export type DriveID = EntityID;
export type AnyEntityID = DriveID | FolderID | FileID;

export type CipherIV = string;
export type EntityKey = Buffer;
export type DriveKey = EntityKey;
export type FileKey = EntityKey;

export type UnixTime = number;
export type ByteCount = number;
export type DataContentType = string;

export type TransactionID = string; // TODO: make a type that checks lengths

export interface ArDriveCommunityTip {
	tipPercentage: number;
	minWinstonFee: Winston;
}

export type TipType = 'data upload';

export type GQLCursor = string;
export type FeeMultiple = number; // TODO: assert always >= 1.0

export type RewardSettings = {
	reward?: Winston;
	feeMultiple?: FeeMultiple;
};

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type MakeOptional<T, K> = Omit<T, K> & Partial<T>;
