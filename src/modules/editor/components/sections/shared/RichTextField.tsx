'use client';

import { useEffect } from 'react';
import { Text } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { Link as TiptapLink } from '@tiptap/extension-link';
import { useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

interface RichTextFieldProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
}

export function RichTextField({ value, onChange, label }: RichTextFieldProps) {
  const editor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false })],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value || '');
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {label && (
        <Text size="sm" fw={500} mb={4}>
          {label}
        </Text>
      )}
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={0}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
}
