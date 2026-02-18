import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const HaskellIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'haskell');
  return <GenericIntroduction course={course} {...props} />;
};

export default HaskellIntroduction;
