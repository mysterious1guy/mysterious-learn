import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const GoIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'go');
  return <GenericIntroduction course={course} {...props} />;
};

export default GoIntroduction;
