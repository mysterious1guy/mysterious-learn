import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const JavaCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'java');
  return <GenericCourse course={course} {...props} />;
};

export default JavaCourse;
