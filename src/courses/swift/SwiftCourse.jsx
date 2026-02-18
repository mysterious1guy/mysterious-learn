import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const SwiftCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'swift');
  return <GenericCourse course={course} {...props} />;
};

export default SwiftCourse;
