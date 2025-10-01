import PlaceHolder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaBold, FaItalic, FaListUl, FaTextHeight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 mt-2 p-1 flex flex-wrap gap-1 rounded-t-lg bg-gray-50 dark:bg-gray-800">
      <Button
        size="xs"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "bg-cyan-600"
            : "bg-gray-400 dark:bg-gray-600"
        }
        tabIndex={-1}
      >
        <FaBold className="h-4 w-4" />
      </Button>
      <Button
        size="xs"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "bg-cyan-600"
            : "bg-gray-400 dark:bg-gray-600"
        }
        tabIndex={-1}
      >
        <FaItalic className="h-4 w-4" />
      </Button>
      <Button
        size="xs"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "bg-cyan-600"
            : "bg-gray-400 dark:bg-gray-600"
        }
        tabIndex={-1}
      >
        <FaListUl className="h-4 w-4" />
      </Button>
      <Button
        size="xs"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-cyan-600"
            : "bg-gray-400 dark:bg-gray-600"
        }
        tabIndex={-1}
      >
        <FaTextHeight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const PostWritePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: "내용을 작성해주세요...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  const handleSubmit = () => {
    // 여기서 백엔드 전송 로직 구현
    if (!editor) return;

    const htmlContent = editor.getHTML();

    console.log(title);
    console.log(htmlContent);
    alert("작성 완료");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">새 글 작성</h1>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label className="text-xl font-bold mb-6" htmlFor="title">
            제목
          </Label>
        </div>
        <TextInput
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-4 boder rounded-lg dark:border-gray-700 editor-container">
        <Label htmlFor="editor" className="text-xl font-bold">
          내용
        </Label>
        <MenuBar editor={editor} />
        <EditorContent
          id="editor"
          editor={editor}
          className="border border-gray-300 dark:border-gray-700 rounded-b-lg"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={handleCancel} color="alternative">
          취소
        </Button>
        <Button onClick={handleSubmit} color="cyan">
          등록
        </Button>
      </div>
    </div>
  );
};

export default PostWritePage;
