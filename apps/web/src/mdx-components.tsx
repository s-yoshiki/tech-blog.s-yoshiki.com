import CopyCharacterButton from 'components/features/article/copy-character-button';
import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  CopyCharacterButton,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
