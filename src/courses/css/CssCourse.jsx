import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const CssCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'css');
  return <GenericCourse course={course} {...props} />;
};

export default CssCourse;
