export default class Dependency {
  constructor(
    label,
    placeholder,
    ref,
    type,
    validationFxn,
    correctLength,
    onInput = () => {},
  ) {
    this.label = label;
    this.placeholder = placeholder;
    this.ref = ref;
    this.type = type;
    this.validationFxn = validationFxn;
    this.onInput = onInput;
    this.maxLength = this.placeholder.length;
    this.correctLength = correctLength;
  }
}
