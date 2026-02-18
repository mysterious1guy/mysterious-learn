import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const VueIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'vue');
  return <GenericIntroduction course={course} {...props} />;
};

export default VueIntroduction;
