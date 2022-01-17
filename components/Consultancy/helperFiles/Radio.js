export default class Radio {
  constructor(label, id, dependencies = []) {
    this.label = label;
    this.id = `page10${id}`;
    this.dependencies = dependencies;
  }
}
