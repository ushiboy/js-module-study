import _ from 'underscore';

export default function world() {
  console.log('world');
}

export function test() {
  console.log(_.uniqueId());
}
