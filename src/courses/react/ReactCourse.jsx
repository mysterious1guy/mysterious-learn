import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const ReactCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'react');
  return <GenericCourse course={course} {...props} />;
};

export default ReactCourse;
