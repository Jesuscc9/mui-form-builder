import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { FileInput } from './File';

const meta: ComponentMeta<typeof FileInput> = {
    component: FileInput,
};

export default meta;

const Template: ComponentStory<typeof FileInput> = args => {
    const [value, setValue] = useState('')

    return (
        <FileInput
            {...args}
            label="File Input"
            name="value"
            
            inputProps={{ multiple: true }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        />
    )
}

export const Standard = Template.bind({})
Standard.args = {
    variant: 'normal',
    label: 'Standard Input',
    loading: false
}

export const Error = Template.bind({})
Error.args = {
    disabled: false,
    label: 'Input with error',
    touched: true,
    error: 'Field required'
}