import React from 'react';
import { Link as RRLink } from "react-router-dom";

const Link = React.forwardRef(({ to, ...props }, ref) => (
  <RRLink to={to} {...props} innerRef={ref} />
));

export default Link;
