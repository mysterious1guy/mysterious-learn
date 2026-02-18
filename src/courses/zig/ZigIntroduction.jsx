import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const ZigIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'zig');
  return <GenericIntroduction course={course} {...props} />;
};

export default ZigIntroduction;
