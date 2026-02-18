import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const GitCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'git');
  return <GenericCourse course={course} {...props} />;
};

export default GitCourse;
