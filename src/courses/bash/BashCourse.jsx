import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const BashCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'bash');
  return <GenericCourse course={course} {...props} />;
};

export default BashCourse;
