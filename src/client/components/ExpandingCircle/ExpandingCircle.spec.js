import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ExpandingCircle from './ExpandingCircle';
import styles from './ExpandingCircle.scss';
import { mapValues } from 'shared/language/language';

/**
 * Object where key is style and value is selector for that style
 */
const selectors = mapValues(styles, styleName => `.${styleName}`);

describe('(Component) Expanding Circle', () => {
  let wrapper;
  const props = { backgroundColor: 'blue' };

  beforeEach(() => {
    wrapper = mount(<ExpandingCircle {...props} />);
  });

  it('Should exist and render html', () => {
    expect(wrapper).to.be.present();
    expect(wrapper.first()).to.be.present();
  });

  it('Should have three main content areas', () => {
    expect(wrapper.children().length).to.eql(3);
  });

  it('Should have a top content area with class .topContent', () => {
    expect(wrapper.find(selectors.topContent)).to.exist;
  });

  it('Should have a mid content area with class .midContent', () => {
    expect(wrapper.find(selectors.midContent)).to.exist;
  });

  it('Should have a bottom content area with class .bottomContent', () => {
    expect(wrapper.find(selectors.bottomContent)).to.exist;
  });

  it('Should accept background color as a prop', () => {
    expect(wrapper.first()).to.have.prop('backgroundColor', 'blue');
    expect(wrapper.first()).to.have.style('backgroundColor', 'blue');
  });
});
