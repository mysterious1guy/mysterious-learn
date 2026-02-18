import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const HaskellCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'haskell');
  return <GenericCourse course={course} {...props} />;
};

export default HaskellCourse;
