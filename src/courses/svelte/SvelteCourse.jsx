import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const SvelteCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'svelte');
  return <GenericCourse course={course} {...props} />;
};

export default SvelteCourse;
