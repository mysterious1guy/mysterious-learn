import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const SolidityCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'solidity');
  return <GenericCourse course={course} {...props} />;
};

export default SolidityCourse;
