import React from "react";
import "./Input.scss";

const Input = (props: ComponentProps)=> {
    const classes = {
        InputElement: "InputElement",
    };

    let inputElement = null;
    switch (props.elementType) {
        case "text" || "password":
            inputElement = (
                <div className="input-container">
                    <div
                        className={`material-input form-item${
                        props.errorsInput[props.elementConfig.name] ? " invalid" : ""
                        }`}
                    >
                        <input
                        className={
                            classes.InputElement + " " + (props.value ? "hasValue" : "")
                        }
                        {...props.elementConfig}
                        value={props.value}
                        ref={props.registerInput({
                            ...props.validations,
                        })}
                        onChange={props.changed}
                        data-test={props.elementConfig.name}
                        />
                        <div className="material-input__placeholder">
                        <span>{props.title}</span>
                        </div>
                    </div>
                    <span className="error-message">{props.errorsInput[props.elementConfig.name] && props.errorsInput[props.elementConfig.name].message}</span>
                </div>
            );
            break;
            case "password":
                inputElement = (
                    <div className="input-container">
                        <div
                            className={`material-input form-item${
                            props.errorsInput[props.elementConfig.name] ? " invalid" : ""
                            }`}
                        >
                            <input
                            className={
                                classes.InputElement + " " + (props.value ? "hasValue" : "")
                            }
                            {...props.elementConfig}
                            value={props.value}
                            ref={props.registerInput({
                                ...props.validations,
                            })}
                            onChange={props.changed}
                            data-test={props.elementConfig.name}
                            />
                            <div className="material-input__placeholder">
                            <span>{props.title}</span>
                            </div>
                        </div>
                        <span className="error-message">{props.errorsInput[props.elementConfig.name] && props.errorsInput[props.elementConfig.name].message}</span>
                    </div>
                );
                break;
        case "number":
            inputElement = (
                <div className="input-container">
                  <div
                    className={`material-input textarea-input form-item${
                      props.errorsInput[props.elementConfig.name] ? " invalid" : ""
                    }`}
                  >
                    <textarea
                      className={classes.InputElement}
                      {...props.elementConfig}
                      value={props.value}
                      ref={props.registerInput({
                        ...props.validations,
                      })}
                      onChange={props.changed}
                    ></textarea>
                    <div className="material-input__placeholder">
                      <span>{props.title}</span>
                    </div>
                  </div>
                  {/* <span className="error-message">{props.errorsInput[props.elementConfig.name] && translateValidationMessage(props.errorsInput[props.elementConfig.name].message)}</span> */}
                </div>
              );
        break;
        case "select":
            inputElement = (
                <div className="form-item mt-4">
                <select
                    className="form-control"
                    value={props.value}
                    {...props.elementConfig}
                    onChange={props.changed}
                    ref={props.registerInput({
                    ...props.validations,
                    })}
                >
                    {props.elementConfig.options.map((option: { valueEn: string }, i:number) => (
                    <option key={i} value={i+1}>
                       {option.valueEn}
                    </option>
                    ))}
                </select>
                </div>
            );
        break;
        case "radio":
            inputElement = (
                <div className="form-item mt-4">
                    <div className="custom-radio">
                        <input className={
                                    classes.InputElement + " " + (props.value ? "hasValue" : "")
                                }
                                {...props.elementConfig}
                                value={props.value}
                                ref={props.registerInput({
                                    ...props.validations,
                                })}
                                onChange={props.changed} />
                        <span>{props.title}</span>
                    </div>  
                    <div className="custom-radio">
                        <input className={
                                    classes.InputElement + " " + (props.value ? "hasValue" : "")
                                }
                                {...props.elementConfig}
                                value={props.value}
                                ref={props.registerInput({
                                    ...props.validations,
                                })}
                                onChange={props.changed} />
                        <span>{props.title}</span>
                    </div> 
                    <div className="custom-radio">
                        <input className={
                                    classes.InputElement + " " + (props.value ? "hasValue" : "")
                                }
                                {...props.elementConfig}
                                value={props.value}
                                ref={props.registerInput({
                                    ...props.validations,
                                })}
                                onChange={props.changed} />
                        <span>{props.title}</span>
                    </div> 
                    <div className="custom-radio">
                        <input className={
                                    classes.InputElement + " " + (props.value ? "hasValue" : "")
                                }
                                {...props.elementConfig}
                                value={props.value}
                                ref={props.registerInput({
                                    ...props.validations,
                                })}
                                onChange={props.changed} />
                        <span>{props.title}</span>
                    </div>                   
                    <div className="error-message">{props.errorsInput[props.elementConfig.name] && props.errorsInput[props.elementConfig.name].message}</div>
                </div>
            );
        break;
        default:
            inputElement = (
                <div className="input-container">
                    <div className="material-input form-item">
                        <input type="text" value="Im testingg" />
                    </div>
                </div>
            );
            break;
    }
    return(
        <div>
            {inputElement}
        </div>
    )
}

interface ComponentProps {
    value?: string;
    elementConfig?: any;
    changed?: Function;
    registerInput: Function;
    validations?: any;
    errorsInput?: any;
    title?: any;
    elementType: string;
}

export default Input;