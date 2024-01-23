import { ThemeProvider, createTheme, TextField } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import { createArticle } from "@/api/blogApi";

export interface IAddArticleProps {}

export default function AddArticle(props: IAddArticleProps) {
  const [image, setImage] = React.useState<string>("");
  const [validImage, setValidImage] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
    // setValidImage(/(http(s?):)([/|.|w|\s|-])*\.(?:jpg|gif|png)/.test(e.target.value))
    setValidImage(true);
  };

  const changeContentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const submitHandler = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createArticle(title, content, image).then((res) => {
        setTitle("");
        setContent("");
        setImage("");
        setValidImage(false);
      });
    },
    [title, content, image]
  );

  return (
    <div className="w-7/12 mx-auto my-10 p-5">
      <ThemeProvider theme={darkTheme}>
        {validImage && <img src={image} alt={title} width={500} height={300} />}
        <form className="flex flex-col gap-5" onSubmit={submitHandler}>
          <div>
            <TextField
              fullWidth
              placeholder="Title"
              onChange={changeTitleHandler}
            />
          </div>
          <div>
            <TextField
              fullWidth
              multiline
              placeholder="Content"
              onChange={changeContentHandler}
            />
          </div>
          <div>
            <TextField
              fullWidth
              placeholder="Image URL"
              onChange={changeImageHandler}
            />
          </div>
          <Button type="submit" variant="outlined" size="large" color="info">
            Add Article
          </Button>
        </form>
      </ThemeProvider>
    </div>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});
