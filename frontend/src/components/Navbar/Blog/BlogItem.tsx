import { useRouter } from "next/router";
import * as React from "react";
import { IArticle } from "types";

export interface IBlogItemProps {
  article: IArticle;
}

export default function BlogItem(props: IBlogItemProps) {
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/article/${props.article.id}`);
  };

  return (
    <div className="mt-16 cursor-pointer p-10 rounded hover:bg-white/10 duration-300" onClick={clickHandler}>
      <div className="text-3xl text-center mb-2">{props.article.title}</div>
      <div className="w-full mx-auto">
        <img
          src={props.article.image}
          alt={props.article.title}
          className="object-contain w-full h-full object-top"
        />
      </div>
      <div className="text-xl">{props.article.content.slice(0, 100)}...</div>
    </div>
  );
}
