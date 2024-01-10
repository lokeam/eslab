import './markdown-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const DEFAULT_TEXT = '# Markdown Editor';
  const [value, setValue] = useState(DEFAULT_TEXT);


  useEffect(() => {
    const listener = ( event:MouseEvent ) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        console.log('clicked element inside editor');
        return;
      }
      console.log('clicked outside editor');
      setIsEditing(false);
    }
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, [])

  if (isEditing) {
    return (
      <div className="markdown-editor-wrapper" ref={ref}>
        <MDEditor value={value} onChange={(updatedValue) => setValue(updatedValue || '')}/>
      </div>
    );
  }

  return (
    <div className="markdown-editor-wrapper card" onClick={() => setIsEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
