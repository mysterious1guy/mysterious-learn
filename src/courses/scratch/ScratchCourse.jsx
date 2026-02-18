import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const ScratchCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'scratch');
  return <GenericCourse course={course} {...props} />;
};

export default ScratchCourse;
