import React from 'react';
import { render } from '@testing-library/react-native';
import Logo from '../Logo';
import { Image, View } from 'react-native';

describe('Logo Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Logo />);

    // Check that the component contains a container View and an Image
    const container = getByTestId('container');
    const image = getByTestId('image');

    expect(container).toBeTruthy();
    expect(image).toBeTruthy();
  });

  it('uses the correct image source', () => {
    const { getByTestId } = render(<Logo />);
    const image = getByTestId('image');

    // Check that the Image has the correct source
    expect(image.props.source).toEqual(require('@/assets/images/background-image.png'));
  });
});
