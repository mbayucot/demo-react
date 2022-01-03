import React from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import { Post, Tag, GET_TAGS } from '@demo/shared';
import { client } from '../../app/apolloClient';

export type FormValues = Pick<Post, 'title' | 'body' | 'comments' | 'tags' | 'tagList'>;
type TagOption = { label: string; value: string };

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
});

const PostForm = (props: FormikProps<FormValues>): React.ReactElement => {
  const { touched, values, handleChange, errors, isSubmitting, handleSubmit, setFieldValue } = props;

  const loadOptions = (inputValue: string, callback: (options: TagOption[]) => void) => {
    client.query({ query: GET_TAGS, variables: { query: inputValue } }).then((response) => {
      callback(response.data.tags.map((x: Tag) => ({ value: x.id, label: x.name })));
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        autoFocus
        value={values.title}
        onChange={handleChange}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="body"
        label="Body"
        name="body"
        autoComplete="body"
        autoFocus
        value={values.body}
        onChange={handleChange}
        error={touched.body && Boolean(errors.body)}
        helperText={touched.body && errors.body}
      />
      <AsyncCreatableSelect
        cacheOptions
        defaultOptions
        placeholder="Tags"
        inputId="tags"
        name="tags"
        defaultValue={values?.tags?.map((x) => ({ value: x.id, label: x.name }))}
        loadOptions={loadOptions}
        styles={{
          container: (base) => ({
            ...base,
            width: 250,
          }),
        }}
        isClearable
        isMulti
        onChange={(value) => {
          setFieldValue('tagList', value ? value.map((x) => x.label) : '');
        }}
      />
      <LoadingButton type="submit" loading={isSubmitting} loadingIndicator="Loading..." variant="outlined">
        Save
      </LoadingButton>
    </Box>
  );
};

export default PostForm;
