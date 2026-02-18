import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const JavaIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'java');
  return <GenericIntroduction course={course} {...props} />;
};

export default JavaIntroduction;
