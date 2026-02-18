import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const NodeIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'node');
  return <GenericIntroduction course={course} {...props} />;
};

export default NodeIntroduction;
