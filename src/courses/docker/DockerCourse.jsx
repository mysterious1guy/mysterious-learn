import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const DockerCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'docker');
  return <GenericCourse course={course} {...props} />;
};

export default DockerCourse;
