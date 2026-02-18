import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const LuaCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'lua');
  return <GenericCourse course={course} {...props} />;
};

export default LuaCourse;
