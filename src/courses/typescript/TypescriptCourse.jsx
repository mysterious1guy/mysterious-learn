import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const TypescriptCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'typescript');
  return <GenericCourse course={course} {...props} />;
};

export default TypescriptCourse;
