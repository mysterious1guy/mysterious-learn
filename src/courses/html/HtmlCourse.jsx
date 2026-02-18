import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const HtmlCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'html');
  return <GenericCourse course={course} {...props} />;
};

export default HtmlCourse;
