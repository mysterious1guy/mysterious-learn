import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const BashIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'bash');
  return <GenericIntroduction course={course} {...props} />;
};

export default BashIntroduction;
