import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const CsharpCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'csharp');
  return <GenericCourse course={course} {...props} />;
};

export default CsharpCourse;
