import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const KotlinIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'kotlin');
  return <GenericIntroduction course={course} {...props} />;
};

export default KotlinIntroduction;
