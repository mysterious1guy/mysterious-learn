import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const SvelteIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'svelte');
  return <GenericIntroduction course={course} {...props} />;
};

export default SvelteIntroduction;
