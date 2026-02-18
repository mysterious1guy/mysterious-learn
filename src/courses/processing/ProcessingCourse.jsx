import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const ProcessingCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'processing');
  return <GenericCourse course={course} {...props} />;
};

export default ProcessingCourse;
