import React            from 'react';
import autoBind         from 'react-autobind';
import pako             from 'pako'

import RaisedButton     from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import AppBar           from 'material-ui/AppBar';
import AppCanvas        from 'material-ui/internal/AppCanvas';
import IconButton       from 'material-ui/IconButton';
import TextField        from 'material-ui/TextField';

import ContentAdd       from 'material-ui/svg-icons/content/add-circle';
import IconLink         from 'material-ui/svg-icons/content/link';

import EditableMacros   from './EditableMacroCard.js';
import Macros           from './MacroCard.js';

const theme = getMuiTheme();

const style = {
    tr: {
        verticalAlign: "top",
    },
    appBar: {
        top: "0px", 
        left: "0px",
        position: "absolute",
    },
    appBarTitle: {
        flex:"none",
    },
    appBarTextField:{
        top:"7px",
        
    },
    addMacros: {
        top: "60px", 
        left: "15px",
        position: "absolute",
    },
    list:{ 
        top:"75px",
        left:"15px",
        width: "99%", 
        position: "absolute",
        display: "block",
    },
    menu: {
        minWidth: "320px", 
    },
    errorFontIcon: {
         fontSize: "24px",
         top: "7px",
         color: "#F44336",
    },
    tabIcon: {
        flexDirection:"row-reverse",
    },
    macros : {
        marginRight: "10px",
        marginBottom: "10px",
        float: "left",
        width:"350px",
        position:"relative",
    },
    stacking :{
        position:"absolute",
    },
    share :{ 
        clear: "left",
        float: "left",
    },
}

function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return results[2];
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function encodeMacros(title, macros)
{
    const json = JSON.stringify({title: title, macros: macros});
    const zlib = pako.deflate(json, { to: 'string' });
    const base64 = b64EncodeUnicode(zlib);
    return base64;
}

function decodeMacros(encoded)
{
    const zlib = b64DecodeUnicode(encoded);
    const json = pako.inflate(zlib, { to: 'string' });
    const macros = JSON.parse(json);
    return macros;
}

export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        autoBind(this);
        this.state={ 
            importedMacros: [],
            editableMacros: [],
            title: null,
            editableMacrosId: 0,
       }
    }

    addMacros()
    {
        const macros = this.state.editableMacros.slice(0);
        const macrosProto = {
            id: this.state.editableMacrosId, 
            protein: 0, 
            carbs:0, 
            fat:0, 
            name: "",
        }; 
        const title = this.state.title;
        macros.unshift(macrosProto);
        const encodedMacros = encodeMacros(title,macros);
        this.setState({
            editableMacros: macros, 
            encodedMacros: encodedMacros,
            editableMacrosId: ++this.state.editableMacrosId 
        });
    }

    onMacrosDelete(index, macros)
    {
        const title = this.state.title;
        const editableMacros = this.state.editableMacros.slice(0);
        editableMacros.splice(index,1)
        const encodedMacros = encodeMacros(title,editableMacros);
        this.setState({
            editableMacros: editableMacros, 
            encodedMacros: encodedMacros 
        });
    }

    onMacrosChanged(index, macros)
    {
        const title = this.state.title;
        const editableMacros = this.state.editableMacros.slice(0);
        macros.id = editableMacros[index].id
        editableMacros[index] = macros;
        const encodedMacros = encodeMacros(title,editableMacros);
        this.setState({
            editableMacros: editableMacros, 
            encodedMacros: encodedMacros
        });
    }

    onTitleChanged(event, title)
    {
        window.document.title = title;
        const encodedMacros = encodeMacros(title, this.state.editableMacros);
        this.setState({
            title: title, 
            encodedMacros: encodedMacros });
    }

    componentDidMount() {
       const encoded = getParameterByName("macros");
       if(encoded)
       {    
            const decoded = decodeMacros(encoded);
            this.setState({
                importedMacros: decoded.macros,
                title: decoded.title
            });
       }
    }
  
    render() {
        const importedMacros = this.state.importedMacros;
        const editableMacros = this.state.editableMacros;
        const href = "?macros=" + this.state.encodedMacros;
        const leftIon = importedMacros.length === 0 ? <IconButton onClick={this.addMacros}><ContentAdd/></IconButton> : null
        const title = importedMacros.length > 0 ? this.state.title : null;
        return (
            <MuiThemeProvider muiTheme={theme}>
            <AppCanvas>
                <AppBar title={title}  showMenuIconButton={importedMacros.length === 0} iconElementLeft={leftIon} style={style.appBar} titleStyle={style.appBarTitle}>
                    {title === null && <TextField onChange={this.onTitleChanged} hintText="Enter a description." style={style.appBarTextField} inputStyle={{color: "#FFF"}}/>}
                </AppBar>
                <div style={style.list}>
                    <div style={style.share}>
                    {importedMacros.map( (item, index) => <Macros key={item.id} style={style.macros} name={item.name} protein={item.protein} fat={item.fat} carb={item.carbs}/>)}
                    {editableMacros.map( (item, index) => <EditableMacros key={item.id} onDelete={this.onMacrosDelete.bind(this,index)} onChange={this.onMacrosChanged.bind(this, index)} style={style.macros} name={item.name} protein={item.protein} fat={item.fat} carbs={item.carbs}/>)}
                    </div>
                    {editableMacros.length > 0 &&  <RaisedButton label="Share" style={style.share} linkButton={true} href={href} secondary={true} icon={<IconLink/>}/>}
                </div>
            </AppCanvas>
            </MuiThemeProvider> 
        );
    }
}