import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const SqlCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'sql');
  return <GenericCourse course={course} {...props} />;
};

export default SqlCourse;
