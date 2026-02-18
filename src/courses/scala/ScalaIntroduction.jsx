import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const ScalaIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'scala');
  return <GenericIntroduction course={course} {...props} />;
};

export default ScalaIntroduction;
