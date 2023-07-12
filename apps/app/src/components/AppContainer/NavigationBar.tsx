import React from 'react';

import { UserButton } from '@clerk/nextjs';
import {
  createStyles,
  Navbar,
  rem,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';

import { env } from '../../../../../env.mjs';

import {
  NavigationItemType,
  NavigationMainPages,
  NavigationSubPages,
} from './type';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },

  aside: {
    flex: `0 0 ${rem(60)}`,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  title: {
    boxSizing: 'border-box',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: rem(60),
    paddingTop: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  linkActive: {
    '&, &:hover': {
      borderLeftColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}));

type PropsType = {
  items?: NavigationItemType[];
  subItem?: NavigationSubPages;
  mainItem?: NavigationMainPages;
};
export function NavigationBar({ mainItem, items, subItem }: PropsType) {
  const { classes, cx } = useStyles();
  const mainLinks = (items || []).map((link) => (
    <Tooltip
      position="right"
      withArrow
      label={link.label}
      key={link.label}
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={link.onClick}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.id === mainItem,
        })}
      >
        {/* @ts-ignore */}
        <link.icon size="1.4rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const activeItem = (items || []).find((item) => item.id === mainItem);

  const links = (activeItem?.subItems || []).map((link) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: subItem === link.id,
      })}
      href="/"
      onClick={(event) => {
        event.preventDefault();
        link.onClick && link.onClick();
      }}
      key={link.id}
    >
      {link.label}
    </a>
  ));

  return (
    <Navbar height="100%" width={{ sm: 300, xs: 300 }}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <UserButton
              signInUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
              afterSignOutUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
            />
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {activeItem?.label}
          </Title>

          {links}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
