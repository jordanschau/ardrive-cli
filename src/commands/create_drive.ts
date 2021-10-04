import { CLICommand } from '../CLICommand';
import { CommonContext } from '../CLICommand/common_context';
import {
	BoostParameter,
	DriveNameParameter,
	DrivePasswordParameter,
	DryRunParameter,
	SeedPhraseParameter,
	WalletFileParameter
} from '../parameter_declarations';
import { Wallet } from '../wallet_new';
import { arDriveFactory, cliWalletDao } from '..';
import { FeeMultiple } from '../types';
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable no-console */

new CLICommand({
	name: 'create-drive',
	parameters: [
		WalletFileParameter,
		SeedPhraseParameter,
		DriveNameParameter,
		DrivePasswordParameter,
		BoostParameter,
		DryRunParameter
	],
	async action(options) {
		const context = new CommonContext(options, cliWalletDao);
		const wallet: Wallet = await context.getWallet();

		const ardrive = arDriveFactory({
			wallet: wallet,
			feeMultiple: options.boost as FeeMultiple,
			dryRun: options.dryRun
		});
		const createDriveResult = await (async function () {
			if (await context.getIsPrivate()) {
				const driveId = uuidv4();
				const driveKey = await context.getDriveKey(driveId);

				return ardrive.createPrivateDrive(options.driveName, driveKey, driveId);
			} else {
				return ardrive.createPublicDrive(options.driveName);
			}
		})();
		console.log(JSON.stringify(createDriveResult, null, 4));

		process.exit(0);
	}
});
