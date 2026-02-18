import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const MarkdownCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'markdown');
  return <GenericCourse course={course} {...props} />;
};

export default MarkdownCourse;
