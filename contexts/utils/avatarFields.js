import {
  topTypeOptions,
  accessoriesTypeOptions,
  facialHairTypeOptions,
  clotheTypeOptions,
  clotheColorOptions,
  eyeTypeOptions,
  eyebrowTypeOptions,
  mouthTypeOptions,
  skinColorOptions,
} from './avatarOptions';

export const topTypeField = {
  name: 'topType',
  type: 'select',
  label: 'Hair',
  options: topTypeOptions,
  required: false,
};
export const accessoriesTypeField = {
  name: 'accessoriesType',
  type: 'select',
  label: 'Accessories',
  options: accessoriesTypeOptions,
  required: false,
};
export const facialHairTypeField = {
  name: 'facialHairType',
  type: 'select',
  label: 'Facial Hair',
  options: facialHairTypeOptions,
  required: false,
};
export const clotheTypeField = {
  name: 'clotheType',
  type: 'select',
  label: 'Clothes',
  options: clotheTypeOptions,
  required: false,
};
export const clotheColorField = {
  name: 'clotheColor',
  type: 'select',
  label: 'Clothes Color',
  options: clotheColorOptions,
  required: false,
};
export const eyeTypeField = {
  name: 'eyeType',
  type: 'select',
  label: 'Eyes',
  options: eyeTypeOptions,
  required: false,
};
export const eyebrowTypeField = {
  name: 'eyebrowType',
  type: 'select',
  label: 'Eyebrows',
  options: eyebrowTypeOptions,
  required: false,
};
export const mouthTypeField = {
  name: 'mouthType',
  type: 'select',
  label: 'Mouth',
  options: mouthTypeOptions,
  required: false,
};
export const skinColorField = {
  name: 'skinColor',
  type: 'select',
  label: 'Skin Color',
  options: skinColorOptions,
  required: false,
};
export const hairColorField = {
  name: 'hairColor',
  type: 'color',
  label: 'Hair Color',
  options: ['#A55728', '#2C1B18', '#B58143', '#D6B370', '#724133', '#4A312C', '#F59797', '#ECDCBF', '#C93305', '#E8E1E1'],
  required: false,
};
export const backgroundColorField = {
  name: 'backgroundColor',
  type: 'background',
  label: 'Background Color',
  options: ['pink', 'orange', 'purple'],
  required: false,
};
