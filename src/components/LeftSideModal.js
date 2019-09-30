import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const Modal = styled(Paper)`
  position: fixed;
  top: calc(25vh / 2);
  z-index: 1000;
  width: 470px;
  max-width: 100%;
  height: 75vh;
  max-height: calc(100vh - 8rem);
  padding: 1rem;
  overflow: auto;
  opacity: 0.8;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;
export default Modal;
