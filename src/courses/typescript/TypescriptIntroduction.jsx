import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const TypescriptIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'typescript');
  return <GenericIntroduction course={course} {...props} />;
};

export default TypescriptIntroduction;
