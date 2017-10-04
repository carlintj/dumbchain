import * as React from "react";

interface UpdateAble {
  updateProperty(key: string, value: string) : any;
}

interface Indexable { 
  [index:string] : {value:string};
}
 
type HOCWrapped<P, PHoc> = React.ComponentClass<P & PHoc> | React.SFC<P & PHoc>;


export default function asForm<P, S>(Component: HOCWrapped<P, UpdateAble & Indexable>, formDataProp:string): React.ComponentClass<P & Indexable> {
  class C extends React.Component<P & UpdateAble & Indexable, S> {
            public render(): JSX.Element {
                console.log(this.props);
    
                // Without "as any", this gives me the error:
                // "error TS2700: Rest types may only be created from object types."
                // I think this is related to
                // https://github.com/Microsoft/TypeScript/issues/12756#issuecomment-265812676
                const {name, ...rest} = this.props as any
                // TODO: We need to get the name from redux
                return (
                    <Component name="TODO: get the name" {...rest} updateProperty={this.updateProperty}/>
                );
              }

            updateProperty (key : string, value : string) {
              this.props[formDataProp][key] = value;
            }
        }
        return C;
    }
    

  /*  
  export default function asForm (MyComponent : typeof React.Component<Props,{}>, formDataProp : any) {
  return class Form extends Component {
    constructor (props : any) {
      super(props)
      this.updateProperty = this.updateProperty.bind(this)
    }

    updateProperty (key : string, value : string) {
      this.props[formDataProp][key] = value
    }

    render () {
      return <MyComponent {...this.props} updateProperty={this.updateProperty}/>
    }
  }
}
*/