import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const JuliaCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'julia');
  return <GenericCourse course={course} {...props} />;
};

export default JuliaCourse;
