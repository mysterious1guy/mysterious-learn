import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const PythonIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'python');
  return <GenericIntroduction course={course} {...props} />;
};

export default PythonIntroduction;
