import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const GoCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'go');
  return <GenericCourse course={course} {...props} />;
};

export default GoCourse;
