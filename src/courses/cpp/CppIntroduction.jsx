import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const CppIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'cpp');
  return <GenericIntroduction course={course} {...props} />;
};

export default CppIntroduction;
