import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const RubyIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'ruby');
  return <GenericIntroduction course={course} {...props} />;
};

export default RubyIntroduction;
