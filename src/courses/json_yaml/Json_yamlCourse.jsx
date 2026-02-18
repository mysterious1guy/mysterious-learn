import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const Json_yamlCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'json_yaml');
  return <GenericCourse course={course} {...props} />;
};

export default Json_yamlCourse;
