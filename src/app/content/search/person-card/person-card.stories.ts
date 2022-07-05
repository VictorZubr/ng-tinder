// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { PersonCardComponent } from './person-card.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Example/Person Card',
  component: PersonCardComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<PersonCardComponent> = (args: PersonCardComponent) => ({
  props: args,
});

export const PersonCard = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
PersonCard.args = {
  person: {
    id: '001',
    name: 'Helen',
    age: 23,
    sex: 'female',
    // photoUrl?: string;
    status: {
      isCandidate: true,
      isFavorite: false,
    },
  },
};
