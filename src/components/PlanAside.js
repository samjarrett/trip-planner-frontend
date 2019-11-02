import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Avatars from '../components/Avatars';
import IdeaCard from '../components/IdeaCard';

const Aside = styled.aside`
  position: fixed;
  top: ${props => props.active ? "0" : "-100%"};
  left: 0;
  width: 100%;
  max-height: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: auto;
  padding-bottom: 1rem;

  transition: left 1000ms ease, top 1000ms ease;

  @media (min-width: 768px) {
    width: 45%;
    max-width: 450px;
    height: 100%;
    top: 0;
    left: ${props => props.active ? "0" : "-100%"};
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const Title = styled.h2`
  margin: 0 1rem;
`;

const MenuButtonContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
`;

function isAsideActiveInBrowser() {
  return window.localStorage.asideActive === "active";
}

function updateAsideActiveStatusInBrowser(asideActive) {
  window.localStorage.asideActive = asideActive ? "active" : "inactive";
}

const PlanAside = ({ plan }) => {
  const [asideActive, setAsideActive] = useState(isAsideActiveInBrowser());

  useEffect(() => {
    updateAsideActiveStatusInBrowser(asideActive);
  }, [asideActive]);


  return (
    <>
      <MenuButtonContainer>
        <Fab aria-label="menu" onClick={event => { setAsideActive(!asideActive); }}>
          <MenuIcon />
        </Fab>
      </MenuButtonContainer>

      <Aside active={asideActive}>
        {asideActive && <Avatars users={plan.users} />}
        {asideActive && plan.title && <Title>{plan.title}</Title>}
        {asideActive && plan.ideas.map((idea) =>
          <IdeaCard key={`aside-${idea.id}`} idea={idea} />
        )}
      </Aside>
    </>
  );
};

export default PlanAside;
