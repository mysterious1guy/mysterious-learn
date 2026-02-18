import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const LispCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'lisp');
  return <GenericCourse course={course} {...props} />;
};

export default LispCourse;
