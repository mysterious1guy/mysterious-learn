import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const MongodbCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'mongodb');
  return <GenericCourse course={course} {...props} />;
};

export default MongodbCourse;
