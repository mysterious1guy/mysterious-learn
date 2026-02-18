import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const ScratchIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'scratch');
  return <GenericIntroduction course={course} {...props} />;
};

export default ScratchIntroduction;
