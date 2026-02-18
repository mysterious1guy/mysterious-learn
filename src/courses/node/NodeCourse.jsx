import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const NodeCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'node');
  return <GenericCourse course={course} {...props} />;
};

export default NodeCourse;
