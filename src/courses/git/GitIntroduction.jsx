import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const GitIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'git');
  return <GenericIntroduction course={course} {...props} />;
};

export default GitIntroduction;
