import React from 'react';
import styled from 'styled-components';

import FullPageModal from './FullPageModal';
import Title from './Title';
import Avatar from './Avatar';
import Card from './Card';

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: -20px;
  left: calc(50% - 20px);
  z-index: 2000;
`;

const PlanList = ({ user }) => (
  <FullPageModal>
    <AvatarContainer><Avatar user={user} /></AvatarContainer>
    <Title>Hey {user.firstName}!</Title>
    <p>You have multiple trips to choose from.</p>
    {user.plans.map((plan) =>
      <Card key={plan.key} title={plan.title || plan.key} linkDestination={`/${plan.key}`} />
    )}
  </FullPageModal>
);
export default PlanList;
