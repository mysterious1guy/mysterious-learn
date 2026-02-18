import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const DartIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'dart');
  return <GenericIntroduction course={course} {...props} />;
};

export default DartIntroduction;
