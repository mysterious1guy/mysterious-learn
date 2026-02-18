import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const ZigCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'zig');
  return <GenericCourse course={course} {...props} />;
};

export default ZigCourse;
