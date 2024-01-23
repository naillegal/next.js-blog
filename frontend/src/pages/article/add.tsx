import AddArticle from '@/containers/Article/AddArticle';
import * as React from 'react';

export interface IAddArticlesProps {
}

export default function AddArticles (props: IAddArticlesProps) {
  return (
    <div>
      <AddArticle />
    </div>
  );
}
