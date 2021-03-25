import { Children, ReactNode, CSSProperties } from 'react';
import { action } from '@storybook/addon-actions';

import { PlusIconSmall } from 'ui/shared/icons/PlusIconSmall';
import { ContextMenuIcon } from 'ui/shared/icons/ContextMenuIcon';

import { IconButton } from './IconButton';
import { IconButtonProps } from './IconButton.types';

export default { title: 'Form/IconButton' };

const ButtonsWrapper = ({ children, title, style }: { children: ReactNode; title?: string; style?: CSSProperties }) => (
  <div style={style}>
    {title && <p style={{ marginBottom: 10 }}>{title}</p>}
    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
      {Children.map(children, (child) => (
        <div style={{ marginRight: 20 }}>{child}</div>
      ))}
    </div>
  </div>
);

const iconButtonColorStory = (color: IconButtonProps['color']) => () => (
  <>
    <ButtonsWrapper title="Contained variant with different sizes">
      <IconButton color={color} size="xxs" variant="contained" onClick={action('button clicked')}>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="xs" variant="contained" onClick={action('button clicked')}>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="s" variant="contained" onClick={action('button clicked')}>
        <ContextMenuIcon />
      </IconButton>
      <IconButton color={color} size="m" variant="contained" onClick={action('button clicked')}>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="l" variant="contained" onClick={action('button clicked')}>
        <ContextMenuIcon />
      </IconButton>
    </ButtonsWrapper>
    <ButtonsWrapper title="Text variant with different sizes">
      <IconButton color={color} size="xxs" variant="inverted" onClick={action('button clicked')}>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="xs" variant="inverted" onClick={action('button clicked')}>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="s" variant="inverted" onClick={action('button clicked')}>
        <ContextMenuIcon />
      </IconButton>
      <IconButton color={color} size="m" variant="inverted" onClick={action('button clicked')}>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="l" variant="inverted" onClick={action('button clicked')}>
        <ContextMenuIcon />
      </IconButton>
    </ButtonsWrapper>
    <ButtonsWrapper title="Outlined variant with different sizes">
      <IconButton color={color} size="xxs" variant="outlined" onClick={action('button clicked')}>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="xs" variant="outlined" onClick={action('button clicked')}>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="s" variant="outlined" onClick={action('button clicked')}>
        <ContextMenuIcon />
      </IconButton>
      <IconButton color={color} size="m" variant="outlined" onClick={action('button clicked')}>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="l" variant="outlined" onClick={action('button clicked')}>
        <ContextMenuIcon />
      </IconButton>
    </ButtonsWrapper>
    <ButtonsWrapper title="With loader, variant with different sizes">
      <IconButton color={color} size="xxs" onClick={action('button clicked')} isLoading>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="xs" onClick={action('button clicked')} isLoading>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="s" variant="inverted" onClick={action('button clicked')} isLoading>
        <ContextMenuIcon />
      </IconButton>
      <IconButton color={color} size="m" onClick={action('button clicked')} variant="outlined" isLoading>
        <PlusIconSmall />
      </IconButton>
      <IconButton color={color} size="l" onClick={action('button clicked')} isLoading>
        <ContextMenuIcon />
      </IconButton>
    </ButtonsWrapper>
  </>
);

export const primary = iconButtonColorStory('primary');
export const secondary = iconButtonColorStory('secondary');
export const success = iconButtonColorStory('success');
export const danger = iconButtonColorStory('danger');
export const dark = iconButtonColorStory('dark');
export const light = iconButtonColorStory('light');
