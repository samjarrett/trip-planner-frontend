import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import filterIdeas from '../utils/idea-filter';
import Avatars from '../components/Avatars';
import IdeaCard from '../components/IdeaCard';

const Aside = styled.aside`
  position: fixed;
  top: ${props => props.active ? "0" : "-100%"};
  left: 0;
  width: 100%;
  max-height: 100%;
  z-index: 800;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: auto;
  padding: 0 1rem 1rem 1rem;

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

const TitleWrapepr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const PlanAside = ({ plan, activeFilter, setActiveFilter }) => {
  const [asideActive, setAsideActive] = useState(isAsideActiveInBrowser());

  useEffect(() => {
    updateAsideActiveStatusInBrowser(asideActive);
  }, [asideActive]);

  const handleActiveFilterChange = ({ target }) => {
    setActiveFilter(target.value);
  }

  const ideas = filterIdeas(activeFilter, plan.ideas);

  return (
    <>
      <MenuButtonContainer>
        <Fab aria-label="menu" onClick={event => { setAsideActive(!asideActive); }}>
          <MenuIcon />
        </Fab>
      </MenuButtonContainer>

      <Aside active={asideActive}>
        {asideActive && <Avatars users={plan.users} />}
        {asideActive && <TitleWrapepr>
          <h2>{plan.title}</h2>
          <FormControl>
            <Select native variant="standard" value={activeFilter} onChange={handleActiveFilterChange}>
              <option value="all">Show All</option>
              <option value="accommodation">Accommodation</option>
              <option value="idea">Idea</option>
              <option value="restaurant">Restaurant</option>
              <option value="shopping">Shopping</option>
            </Select>
          </FormControl>
        </TitleWrapepr>}
        {asideActive && ideas.map((idea) =>
          <IdeaCard key={`aside-${idea.id}`} idea={idea} />
        )}
      </Aside>
    </>
  );
};

export default PlanAside;
