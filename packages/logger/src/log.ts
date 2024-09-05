import type { BettererLoggerCodeInfo, BettererLoggerMessage, BettererLogger, BettererLogs } from './types.js';

/**
 * @internal This could change at any point! Please don't use!
 *
 * Log a set of {@link BettererLog | `BettererLog`} instructions with a given {@link BettererLogger | `BettererLogger`}.
 *
 * @remarks Useful for when you want to capture logging information, but
 * delay when it is actually shown to the user.
 */
export async function logΔ(logs: BettererLogs, logger: BettererLogger): Promise<void> {
  await Promise.all(
    logs.map((log) => {
      const types = Object.keys(log) as Array<keyof BettererLogger>;
      return types.map((type) => logger[type](log[type] as BettererLoggerCodeInfo & BettererLoggerMessage));
    })
  );
}
