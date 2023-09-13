import { Account } from './account.entity';
import { GenericEntities } from './generic';
import { Plan } from './plan.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

const WorkspaceEntities = [User, Role, Account, Plan];

export const Entities = [...GenericEntities, ...WorkspaceEntities];
