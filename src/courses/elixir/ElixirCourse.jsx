import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const ElixirCourse = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'elixir');
  return <GenericCourse course={course} {...props} />;
};

export default ElixirCourse;
