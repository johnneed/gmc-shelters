
const makeNumber = (num: any, deflt?: number): number | undefined => {
  const myNumber = Number(num);
  return (isNaN(myNumber)) ? deflt : myNumber;
}

const makeString = (str: any, deflt?: string): string | undefined => {
  return (typeof str !== 'string') ? deflt : str;
}

const makeBool = (bool: any, deflt?: boolean): boolean | undefined => {
  return (typeof bool !== 'boolean') ? deflt : bool;
}

export { makeNumber, makeString, makeBool };
