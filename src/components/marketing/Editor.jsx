import { useEffect, useState } from 'react';
import { EditorState, ContentState, Modifier, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../css/editor.css";

// Convert parent value into EditorState safely
function toEditorState(input) {
  if (!input) return EditorState.createEmpty();

  if (typeof input.getCurrentContent === 'function') return input; // already EditorState

  if (typeof input === 'object' && input.blocks && input.entityMap !== undefined) {
    return EditorState.createWithContent(convertFromRaw(input));
  }

  if (typeof input === 'string') {
    const { contentBlocks, entityMap } = htmlToDraft(input);
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
  }

  return EditorState.createEmpty();
}

const EditorCustomToolbarOption = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(() => toEditorState(value));

  // sync only if parent sends a *different* value
  useEffect(() => {
    if (value && value !== editorState) {
      setEditorState(toEditorState(value));
    }
  }, [value]);

  const handleEditorChange = (newState) => {
    setEditorState(newState);
    onChange?.(newState); // notify parent
  };

  const StarButton = () => (
    <div
      onClick={() => {
        const contentState = Modifier.replaceText(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          '⭐',
          editorState.getCurrentInlineStyle()
        );
        const newState = EditorState.push(editorState, contentState, 'insert-characters');
        handleEditorChange(newState);
      }}
      style={{
        cursor: 'pointer',
        padding: '6px',
        margin: '0 2px',
        borderRadius: '3px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        border: '1px solid #a19b9bff',
      }}
    >
      ⭐
    </div>
  );

  return (
    <Editor
  editorState={editorState}
  onEditorStateChange={handleEditorChange}
  toolbar={{
    options: [
      'inline',
      'blockType',
      'fontSize',
      'fontFamily', 
      'list',
      'textAlign',
      'link',
      'embedded',
      'emoji',
      'image',
      'remove',
      'history',
    ],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
    },
    list: { options: ['unordered', 'ordered'] },
    fontSize: {
      options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36],
    },
    fontFamily: {
      options: [
        'Arial',
        'Georgia',
        'Impact',
        'Tahoma',
        'Times New Roman',
        'Verdana',
        'Courier New',
      ],
    },
  }}
  toolbarCustomButtons={[<StarButton key="star" />]}
/>

  );
};

export default EditorCustomToolbarOption;
