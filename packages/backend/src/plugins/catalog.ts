import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { KeycloakOrgEntityProvider } from '@janus-idp/backstage-plugin-keycloak-backend'
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { ManagedClusterProvider } from '@janus-idp/backstage-plugin-ocm-backend';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);

  const scheduleTask = env.scheduler.createScheduledTaskRunner({
    frequency: { hours: 1 },
    timeout: { minutes: 50 },
    initialDelay: { seconds: 15 },
  });

  builder.addEntityProvider(
    KeycloakOrgEntityProvider.fromConfig(env.config, {
      id: 'development',
      logger: env.logger,
      schedule: scheduleTask,
    }),
  );

  const ocm = ManagedClusterProvider.fromConfig(env.config, {
    logger: env.logger,
  });
  builder.addEntityProvider(ocm);

  builder.addProcessor(new ScaffolderEntitiesProcessor());
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();

  await env.scheduler.scheduleTask({
    id: 'run_ocm_refresh',
    fn: async () => {
      await ocm.run();
    },
    frequency: { minutes: 30 },
    timeout: { minutes: 10 },
  });
  return router;
}
