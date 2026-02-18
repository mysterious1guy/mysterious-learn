import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const AssemblyCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'assembly');
  return <GenericCourse course={course} {...props} />;
};

export default AssemblyCourse;
