import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const SqlIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'sql');
  return <GenericIntroduction course={course} {...props} />;
};

export default SqlIntroduction;
