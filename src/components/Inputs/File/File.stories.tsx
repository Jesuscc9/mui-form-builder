import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { TextInput } from './File';

const meta: ComponentMeta<typeof TextInput> = {
    component: TextInput,
};
export default meta;

const Template: ComponentStory<typeof TextInput> = args => {
    const [value, setValue] = useState('')

    return (
        <TextInput
            {...args}
            label="Outlined select"
            name="value"
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        />
    )
}

export const Standard = Template.bind({})
Standard.args = {
    variant: 'standard',
    label: 'Standard Input',
    placeholder: 'Type'
}

export const Outlined = Template.bind({})
Outlined.args = {
    variant: 'outlined',
    label: 'OutlinedInput',
    placeholder: 'Type'
}

export const Error = Template.bind({})
Error.args = {
    disabled: false,
    label: 'Input with error',
    touched: true,
    error: 'Field required'
}