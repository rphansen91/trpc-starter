import { program } from 'commander';
import { trpc } from '../clients/fetch';

program.command('healthy').action(async () => {
  try {
    const healthy = await trpc.healthy.query();
    console.log({ healthy });
  } catch (err) {
    console.log(err.name || Error, err.message);
  }
});

program.parse();
