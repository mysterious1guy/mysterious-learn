import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const SwiftIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'swift');
  return <GenericIntroduction course={course} {...props} />;
};

export default SwiftIntroduction;
