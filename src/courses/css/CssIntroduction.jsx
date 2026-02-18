import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const CssIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'css');
  return <GenericIntroduction course={course} {...props} />;
};

export default CssIntroduction;
