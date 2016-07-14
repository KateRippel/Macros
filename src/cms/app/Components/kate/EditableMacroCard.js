import React            from 'react';
import autoBind         from 'react-autobind';

import TextField        from 'material-ui/TextField';
import {Table, 
        TableBody, 
        TableHeader, 
        TableHeaderColumn, 
        TableRow, 
        TableRowColumn} from 'material-ui/Table';
import {Card, CardText} from 'material-ui/Card';
import Divider          from 'material-ui/Divider';
import IconButton       from 'material-ui/IconButton';
import IconDelete       from 'material-ui/svg-icons/action/delete-forever';

const style= {
    remove : {
       position:"absolute",
       top: "0px",
       right: "0px",
    },
    iconNew: {
        position:"relative",
        top: "5px",
    },
    subTitle : {
        fontSize: "14px",
        color: "rgba(0, 0, 0, 0.54)",
        display: "block",
        marginLeft:"7px",
   },
    title : {
        width:"80%", 
        overflow:"hidden", 
        textOverflow: "ellipsis", 
        whiteSpace: "nowrap", 
        display:"inline-block", 
        margin:"7px", 
        marginBottom:"0px",
        fontSize:"20px",
    },
}

export default class EditableMacros extends React.Component {
    constructor(props, context) {
        super(props, context);
        autoBind(this);
        this.state = {};
    }

    getCalories(protein, carb, fat)
    {
        return (protein + carb) * 4 + fat * 9
    }

    onChange(key, event, value)
    {
        event.target.maxLength = 3;
        if(isNaN(value)){
            value = 0;
        }
        const defaultValue = {protein: this.props.protein, carbs:this.props.carbs, fat:this.props.fat, name: this.props.name};
        const macros = Object.assign({},defaultValue,{[key]: Number(value)});
        this.props.onChange(macros);
    }

    onChangeName(event, name)
    {
        const defaultValue = {protein: this.props.protein, carbs:this.props.carbs, fat:this.props.fat, name: this.props.name};
        const macros = Object.assign({},defaultValue,{name:name});
        this.props.onChange(macros);
    }

    render() {
        const styleInherit = Object.assign({},this.props.style)
        const {protein, carbs, fat, name} = this.props
        const calories = this.getCalories(protein, carbs, fat);

        return  (
            <Card style={styleInherit}>
                <IconButton style={style.remove} onClick={this.props.onDelete}><IconDelete/></IconButton>
                <CardText>
                    <div style={{display:"inline"}}>
                        <div style={style.title}> <TextField underlineShow={false} onChange={this.onChangeName} hintText="Macros Name" /></div>
                    </div>
                    <Divider style={{margin:"19px"}}/>
                    <div style={style.title}>Calories: {calories}</div>
                    <Table fixedHeader={false} selectable={false} style={{display:"block"}} >
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{fontSize:"16px"}}>Macronutrient</TableHeaderColumn>
                                <TableHeaderColumn style={{fontSize:"16px"}}>Grams</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} >
                            <TableRow>
                                <TableRowColumn>Protein</TableRowColumn>
                                <TableRowColumn><TextField name={"protein"} style={{width:"30px"}} onChange={this.onChange.bind(this, "protein")} underlineShow={false} defaultValue={protein}/>g</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Carbohydrates</TableRowColumn>
                                <TableRowColumn><TextField name={"carbs"} style={{width:"30px"}} onChange={this.onChange.bind(this, "carbs")} underlineShow={false} defaultValue={carbs}/>g</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Fat</TableRowColumn>
                                <TableRowColumn><TextField name={"fat"} style={{width:"30px"}} onChange={this.onChange.bind(this, "fat")} underlineShow={false} defaultValue={fat}/>g</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardText>
            </Card>
        );
    }  
}

      