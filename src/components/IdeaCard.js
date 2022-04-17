import React from 'react';
import { useLocation } from "wouter";
import Card from './Card';


const IdeaCard = ({ idea }) => {
  const [location, setLocation] = useLocation();
  return (
    <Card title={idea.title} description={idea.description} linkDestination={`${location}/${idea.id}`} />
  );
};
export default IdeaCard;
