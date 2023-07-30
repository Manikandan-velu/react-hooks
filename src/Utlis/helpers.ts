//get auth token to validate
export const isAuth = () => {
    return localStorage.getItem('access_token') ? true : false;
}
// find attribute for test
export const findTestAttr = (component: any, attr: string)=> {
  let wrap = component.find(`[data-test='${attr}']`);
  return wrap;
}
