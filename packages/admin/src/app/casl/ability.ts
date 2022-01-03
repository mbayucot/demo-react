import { Ability, AbilityClass, AbilityBuilder } from '@casl/ability';

import { User } from '@demo/shared';

export enum Role {
  Author = 'Author',
  Editor = 'Editor',
  Admin = 'Admin',
}

const manage = ['create', 'read', 'update', 'delete'];
type Actions = typeof manage[number];
export type Subjects = 'Post' | 'User' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbilityClass = Ability;

export const defineAbilityFor = (user?: User): AppAbility => {
  const { can, rules } = new AbilityBuilder<AppAbility>(Ability);
  const role = Role[user?.role];

  switch (role) {
    case Role.Admin:
      can(manage, 'Post');
      can(manage, 'User');
      break;
    case Role.Editor:
      can(manage, 'Post');
      break;
  }

  return new AppAbilityClass(rules);
};

export default defineAbilityFor;
