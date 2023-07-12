import { NavigationMainPages, NavigationSubPages } from './type';

export function checkAppBooksPath(pathname: string) {
  if (pathname?.includes('/locations')) {
    return {
      main: NavigationMainPages.Trips,
      sub: NavigationSubPages.LocationsOverview,
    };
  }

  if (pathname?.includes('/cars')) {
    return {
      main: NavigationMainPages.Trips,
      sub: NavigationSubPages.CarOverview,
    };
  }

  if (pathname?.includes('/employees')) {
    return {
      main: NavigationMainPages.Trips,
      sub: NavigationSubPages.EmployeeOverview,
    };
  }

  return {
    main: NavigationMainPages.Trips,
    sub: NavigationSubPages.TripsOverview,
  };
}

export function checkAppPath(pathname: string) {
  if (pathname?.includes('/upload')) {
    return {
      sub: NavigationSubPages.UploadProviderCSV,
      main: NavigationMainPages.Dashboard,
    };
  }

  if (pathname?.includes('/export')) {
    return {
      sub: NavigationSubPages.ExportData,
      main: NavigationMainPages.Dashboard,
    };
  }

  if (pathname?.includes('/books')) {
    return checkAppBooksPath(pathname);
  }

  return {
    sub: NavigationSubPages.Overview,
    main: NavigationMainPages.Dashboard,
  };
}

export function checkSettingsPath(pathname: string) {
  if (pathname?.includes('/organization')) {
    return {
      sub: NavigationSubPages.Organisation,
      main: NavigationMainPages.Settings,
    };
  }

  if (pathname?.includes('/api-keys')) {
    return {
      sub: NavigationSubPages.ApiKeys,
      main: NavigationMainPages.Settings,
    };
  }

  return {
    sub: NavigationSubPages.Organisation,
    main: NavigationMainPages.Settings,
  };
}
