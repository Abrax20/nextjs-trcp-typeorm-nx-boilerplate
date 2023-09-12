import { AccountEntity } from './account.entity';
import { GenericEntities } from './generic';
import { PlanEntity } from './plan.entity';
import { RoleEntity } from './role.entity';
import { SubscriptionEntity } from './subscription.entity';
import { UserEntity } from './user.entity';

const WorkspaceEntities = [
  UserEntity,
  RoleEntity,
  AccountEntity,
  SubscriptionEntity,
  PlanEntity,
];

export const Entities = [...GenericEntities, ...WorkspaceEntities];
