import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const RubyCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'ruby');
  return <GenericCourse course={course} {...props} />;
};

export default RubyCourse;
