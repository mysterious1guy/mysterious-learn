import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const HtmlIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'html');
  return <GenericIntroduction course={course} {...props} />;
};

export default HtmlIntroduction;
