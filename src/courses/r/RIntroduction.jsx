import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const RIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'r');
  return <GenericIntroduction course={course} {...props} />;
};

export default RIntroduction;
