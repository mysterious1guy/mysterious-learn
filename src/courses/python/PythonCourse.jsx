import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const PythonCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'python');
  return <GenericCourse course={course} {...props} />;
};

export default PythonCourse;
