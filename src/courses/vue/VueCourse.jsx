import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const VueCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'vue');
  return <GenericCourse course={course} {...props} />;
};

export default VueCourse;
