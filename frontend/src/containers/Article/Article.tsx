import * as React from 'react';
import { IArticle } from 'types';

export interface IArticleProps {
    article : IArticle
}

export default function Article (props: IArticleProps) {
  return (
    <div className='w-5/12 p-5 mx-auto'>
      <h1 className='text-center text-5xl mb-5 font-bold'>{props.article.title}</h1>
      <div className='w-full'>
        <img className='w-full h-full' src={props.article.image} alt={props.article.title} />
      </div>
      <div className='mt-5 text-xl'>{props.article.content}</div>
    </div>
  );
}
