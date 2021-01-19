import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import ReactHtmlParser from 'react-html-parser';

const SPFieldRichTextDisplay: React.FunctionComponent<ISPFormFieldProps> = (props) => {
    return <div className='ard-textfield-display'>{ReactHtmlParser(props.value)}</div>;
};

export default SPFieldRichTextDisplay;
