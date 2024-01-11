import './markdown-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box } from '../state';
import { useActions } from '../hooks/use-actions';


interface MarkdownEditorProps {
  box: Box;
}


const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ box }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { updateBox } = useActions();

  const DEFAULT_TEXT = '# Markdown Editor';


  useEffect(() => {
    const listener = ( event:MouseEvent ) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        console.log('clicked element inside editor');
        return;
      }
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
        <MDEditor value={box.content} onChange={(updatedValue) => updateBox(box.id, updatedValue || '')}/>
      </div>
    );
  }

  return (
    <div className="markdown-editor-wrapper card" onClick={() => setIsEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={box.content || 'Click inside to edit'} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
