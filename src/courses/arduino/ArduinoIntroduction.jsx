import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const ArduinoIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'arduino');
  return <GenericIntroduction course={course} {...props} />;
};

export default ArduinoIntroduction;
