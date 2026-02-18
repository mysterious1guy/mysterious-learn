import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const CsharpIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'csharp');
  return <GenericIntroduction course={course} {...props} />;
};

export default CsharpIntroduction;
