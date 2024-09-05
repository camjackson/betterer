import type { Command } from 'commander';

import type { BettererCLIUpgradeConfig } from './types.js';

import { React, getRenderOptionsΔ, render } from '@betterer/render';

import { Upgrade } from './upgrade/upgrade.js';
import { upgradeCommand } from './options.js';

const BETTERER_TS = './.betterer.ts';

/**
 * Run the **Betterer** `upgrade` command to upgrade **Betterer** in an existing project.
 */
export function upgrade(cwd: string): Command {
  const command = upgradeCommand();
  command.description('upgrade Betterer files in a project');
  command.action(async (config: BettererCLIUpgradeConfig): Promise<void> => {
    const configPaths = config.config ? config.config : [BETTERER_TS];

    const app = render(
      <Upgrade configPaths={configPaths} cwd={cwd} save={config.save} logo={config.logo} />,
      getRenderOptionsΔ(process.env.NODE_ENV)
    );
    await app.waitUntilExit();
  });

  return command;
}
