import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const PhpCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'php');
  return <GenericCourse course={course} {...props} />;
};

export default PhpCourse;
