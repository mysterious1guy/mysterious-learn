import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const FigmaCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'figma');
  return <GenericCourse course={course} {...props} />;
};

export default FigmaCourse;
