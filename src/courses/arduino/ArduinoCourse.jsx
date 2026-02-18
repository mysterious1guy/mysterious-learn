import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const ArduinoCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'arduino');
  return <GenericCourse course={course} {...props} />;
};

export default ArduinoCourse;
