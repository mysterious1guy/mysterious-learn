import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const JuliaIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'julia');
  return <GenericIntroduction course={course} {...props} />;
};

export default JuliaIntroduction;
