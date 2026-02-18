import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const Json_yamlIntroduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === 'json_yaml');
  return <GenericIntroduction course={course} {...props} />;
};

export default Json_yamlIntroduction;
