import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const DEFAULT_TEXT = '# Markdown Editor';

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
      <div ref={ref}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div onClick={() => setIsEditing(true)}>
      <MDEditor.Markdown source={DEFAULT_TEXT} />
    </div>
  );
};

export default MarkdownEditor;
