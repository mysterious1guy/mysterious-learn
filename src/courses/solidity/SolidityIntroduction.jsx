import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const SolidityIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'solidity');
  return <GenericIntroduction course={course} {...props} />;
};

export default SolidityIntroduction;
