import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const ElixirIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'elixir');
  return <GenericIntroduction course={course} {...props} />;
};

export default ElixirIntroduction;
