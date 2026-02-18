import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const MarkdownIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'markdown');
  return <GenericIntroduction course={course} {...props} />;
};

export default MarkdownIntroduction;
