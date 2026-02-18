import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const RCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'r');
  return <GenericCourse course={course} {...props} />;
};

export default RCourse;
