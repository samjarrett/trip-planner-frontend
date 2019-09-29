import React from 'react';
import { withRouter } from "react-router-dom";
import Card from './Card';


const IdeaCard = withRouter(({ idea, match }) => (
  <Card title={idea.title} description={idea.description} linkDestination={`${match.url}/${idea.id}`} />
));
export default IdeaCard;
