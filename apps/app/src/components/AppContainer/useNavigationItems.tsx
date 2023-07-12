import { useMemo } from 'react';

import {
  IconHome,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import {
  getHomePath,
} from '../../helpers/navigation';

import {
  NavigationItemType,
  NavigationMainPages,
  NavigationSubPages,
} from './type';

export function useNavigationItems() {
  const router = useRouter();

  return useMemo<NavigationItemType[]>(() => {
    return [
      {
        icon: IconHome,
        onClick: () => {
          router.push(getHomePath());
        },
        label: 'Dashboard',
        id: NavigationMainPages.Dashboard,
        subItems: [
          {
            icon: IconHome,
            label: 'Overview',
            onClick: () => {
              router.push(getHomePath());
            },
            id: NavigationSubPages.Overview,
          },
        ],
      }
    ] as NavigationItemType[];
  }, []);
}
