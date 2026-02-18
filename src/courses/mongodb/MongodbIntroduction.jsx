import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const MongodbIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'mongodb');
  return <GenericIntroduction course={course} {...props} />;
};

export default MongodbIntroduction;
