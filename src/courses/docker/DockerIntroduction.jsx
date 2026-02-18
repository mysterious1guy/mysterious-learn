import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const DockerIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'docker');
  return <GenericIntroduction course={course} {...props} />;
};

export default DockerIntroduction;
