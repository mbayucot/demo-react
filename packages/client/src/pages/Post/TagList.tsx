import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Tag } from '@demo/shared';

interface TagListProps {
  tags: Tag[];
}

const TagList: FC<TagListProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag) => (
        <Link key={tag.id} to={`/?tag=${tag.name}`}>
          <p>{tag.name}</p>
        </Link>
      ))}
    </>
  );
};

export default TagList;
