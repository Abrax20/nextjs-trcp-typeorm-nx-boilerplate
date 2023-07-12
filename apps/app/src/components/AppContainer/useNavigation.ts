import { useMemo } from 'react';

import { useSession } from '@clerk/clerk-react';
import { usePathname } from 'next/navigation';

import { NavigationMainPages, NavigationSubPages } from './type';
import { checkAppPath, checkSettingsPath } from './useNavigation.helper';
import { useNavigationItems } from './useNavigationItems';

export function useNavigation() {
  const pathname = usePathname();
  const { isLoaded } = useSession();
  const items = useNavigationItems();

  const show = useMemo(() => {
    if (pathname?.includes('/sign-in')) return false;
    if (pathname?.includes('/sign-up')) return false;
    return true;
  }, [pathname]);

  const options = useMemo(() => {
    if (pathname?.includes('/settings')) {
      return checkSettingsPath(pathname);
    }

    if (pathname?.includes('/app')) {
      return checkAppPath(pathname);
    }

    return {
      sub: NavigationSubPages.Overview,
      main: NavigationMainPages.Dashboard,
    };
  }, [pathname]);

  return {
    show: show && isLoaded,
    items,
    ...options,
  };
}
