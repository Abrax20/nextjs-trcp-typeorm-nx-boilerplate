import { GenericEntities } from './generic';
import { WorkspaceEntities } from './organisations';

export const Entities = [...GenericEntities, ...WorkspaceEntities];

export * from './generic';
export * from './organisations';
