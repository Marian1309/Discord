'use client';

import { type FC, useMemo, useState } from 'react';

import emojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile } from 'lucide-react';
import { useTheme } from 'next-themes';

import { handleWidth } from '@/lib/utils';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

type Props = {
  onChange: (value: string) => void;
};

const EmojiPicker: FC<Props> = ({ onChange }) => {
  const { resolvedTheme } = useTheme();
  const [screenWidth] = useState(handleWidth());

  const isMobileWidth = useMemo(() => {
    return screenWidth < 600;
  }, [screenWidth]);

  return (
    <Popover>
      <PopoverTrigger>
        <Smile />
      </PopoverTrigger>

      <PopoverContent
        side="right"
        sideOffset={40}
        className="mb-[72px] border-none bg-transparent shadow-none drop-shadow-none"
      >
        <Picker
          theme={resolvedTheme}
          data={emojiData}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          emojiSize={20}
          emojiButtonSize={30}
          perLine={isMobileWidth ? 7 : 10}
          set="google"
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
