import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const LispIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'lisp');
  return <GenericIntroduction course={course} {...props} />;
};

export default LispIntroduction;
