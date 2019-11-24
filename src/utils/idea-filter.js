const filterIdeas = (activeFilter, ideas) => {
  return ideas.filter((idea) => {
    return activeFilter === "all" || idea.type === activeFilter.toUpperCase();
  });
}

export default filterIdeas;
