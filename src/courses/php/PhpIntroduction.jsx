import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const PhpIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'php');
  return <GenericIntroduction course={course} {...props} />;
};

export default PhpIntroduction;
