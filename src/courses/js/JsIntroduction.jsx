import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const JsIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'js');
  return <GenericIntroduction course={course} {...props} />;
};

export default JsIntroduction;
