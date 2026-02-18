import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const CppCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'cpp');
  return <GenericCourse course={course} {...props} />;
};

export default CppCourse;
