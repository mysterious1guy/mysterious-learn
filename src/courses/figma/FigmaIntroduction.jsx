import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const FigmaIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'figma');
  return <GenericIntroduction course={course} {...props} />;
};

export default FigmaIntroduction;
