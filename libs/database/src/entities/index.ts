import { Account } from './account.entity';
import { GenericEntities } from './generic';
import { Organization } from './organization.entity';
import { Plan } from './plan.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

const WorkspaceEntities = [User, Role, Account, Plan, Organization];

const Entities = [...GenericEntities, ...WorkspaceEntities];

export default Entities;
