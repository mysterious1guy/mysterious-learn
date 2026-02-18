import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const DartCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'dart');
  return <GenericCourse course={course} {...props} />;
};

export default DartCourse;
