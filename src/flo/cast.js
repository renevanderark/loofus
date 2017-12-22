/* @flow */
export default (type : any, target : any) => {
  if (!(target instanceof type)) {
    throw new Error(`${target} is not a ${type}`);
  }
  return target;
};
