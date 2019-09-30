import styled from 'styled-components';

const Title = styled.h2`
  margin-top: ${props => props.topMargin ? '1rem' : '0'};
  margin-bottom: 1rem;
`;
export default Title;
