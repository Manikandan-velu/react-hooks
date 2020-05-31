export const isAuth = () => {
    return localStorage.getItem('access_token') ? true : false;
}

export const findTestAttr = (component: any, attr: string)=> {
  let wrap = component.find(`[data-test='${attr}']`);
  return wrap;
}