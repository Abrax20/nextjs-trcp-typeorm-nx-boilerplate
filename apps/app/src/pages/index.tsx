import { useEffect } from 'react';

import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import styled from '@emotion/styled';
import { type NextPage } from 'next';
import Head from 'next/head';
import { api } from 'src/helpers/api';
import { Title } from '@mantine/core';

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Home: NextPage = () => {
  const { organization } = useOrganization();
  const { data } = api.example.getExample.useQuery({ welcome: true });
  const { setActive, organizationList, isLoaded } = useOrganizationList();

  useEffect(() => {
    if (organization) return;
    if (!isLoaded) return;
    if (!organizationList.length || !organizationList[0]) return;

    setActive({ organization: organizationList[0]?.organization?.id });
  }, [isLoaded, organization, organizationList, setActive]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Become an overview about your A/B Tests."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContainer>
        <Title order={2}>{data?.msg}</Title>
      </StyledContainer>
    </>
  );
};

export default Home;
