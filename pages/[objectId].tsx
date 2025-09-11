import { useRouter } from 'next/router';
import React from 'react';

const ObjectDetail: React.FC = () => {
  const router = useRouter();
  const { objectId } = router.query;

  // Mock data for demonstration
  const mockData = {
    '1': { name: 'Object One', description: 'This is the first object.' },
    '2': { name: 'Object Two', description: 'This is the second object.' },
    '3': { name: 'Object Three', description: 'This is the third object.' },
  };

  const objectDetail = mockData[objectId as string] || { name: 'Unknown Object', description: 'No description available.' };

  return (
    <div>
      <h1>{objectDetail.name}</h1>
      <p>{objectDetail.description}</p>
    </div>
  );
};

export default ObjectDetail;