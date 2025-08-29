import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Skeleton from './Skeleton.vue';

describe('Skeleton', () => {
  it('renders with base classes', () => {
    const wrapper = mount(Skeleton);
    const el = wrapper.get('[data-slot="skeleton"]');
    expect(el.classes()).toContain('animate-pulse');
    expect(el.classes()).toContain('rounded-md');
  });

  it('merges custom class', () => {
    const wrapper = mount(Skeleton, { props: { class: 'h-6 w-40' } });
    const el = wrapper.get('[data-slot="skeleton"]');
    expect(el.classes()).toContain('h-6');
    expect(el.classes()).toContain('w-40');
  });
});
