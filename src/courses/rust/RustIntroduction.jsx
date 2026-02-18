import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const RustIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'rust');
  return <GenericIntroduction course={course} {...props} />;
};

export default RustIntroduction;
