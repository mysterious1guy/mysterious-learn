import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const RustCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'rust');
  return <GenericCourse course={course} {...props} />;
};

export default RustCourse;
