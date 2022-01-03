import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchBar from '../components/SearchBar';

export default {
  title: 'Shared/SearchBar',
  component: SearchBar,
  argTypes: {
    value: '',
    onChange: { action: 'clicked' },
    clearSearch: { action: 'clicked' },
  },
} as unknown as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
