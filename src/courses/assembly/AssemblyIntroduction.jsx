import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const AssemblyIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'assembly');
  return <GenericIntroduction course={course} {...props} />;
};

export default AssemblyIntroduction;
