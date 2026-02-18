import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const LuaIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'lua');
  return <GenericIntroduction course={course} {...props} />;
};

export default LuaIntroduction;
