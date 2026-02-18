#!/bin/bash
courses=("python" "html" "css" "js" "react" "node" "php" "sql" "java" "cpp" "git" "figma")
TARGET_DIR="/home/mouhamed/Projets/mysterious-learn/src/courses"
mkdir -p "$TARGET_DIR"

for id in "${courses[@]}"; do
  mkdir -p "$TARGET_DIR/$id"
  
  # Capitalize first letter logic matching standard conventions
  # For 'js', we might want 'Js' or 'JS'? Let's stick to simple Capitalize for filename consistency
  # js -> Js
  ID_CAP=$(echo "$id" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')
  
  # Special casing for names if strictly needed, but let's keep it simple.
  
  # Introduction File
  cat <<EOF > "$TARGET_DIR/$id/${ID_CAP}Introduction.jsx"
import React from 'react';
import GenericIntroduction from '../../components/GenericIntroduction';
import { coursesData } from '../data';

const ${ID_CAP}Introduction = (props) => {
  const course = coursesData.flatMap(cat => cat.items).find(c => c.id === '$id');
  return <GenericIntroduction course={course} {...props} />;
};

export default ${ID_CAP}Introduction;
EOF

  # Course File
  cat <<EOF > "$TARGET_DIR/$id/${ID_CAP}Course.jsx"
import React from 'react';
import GenericCourse from '../../components/GenericCourse';
import { coursesData } from '../data';

const ${ID_CAP}Course = (props) => {
   const course = coursesData.flatMap(cat => cat.items).find(c => c.id === '$id');
  return <GenericCourse course={course} {...props} />;
};

export default ${ID_CAP}Course;
EOF

echo "Created $id -> ${ID_CAP}Introduction.jsx and ${ID_CAP}Course.jsx"

done
