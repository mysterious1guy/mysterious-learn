import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const ReactIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'react');
  return <GenericIntroduction course={course} {...props} />;
};

export default ReactIntroduction;
