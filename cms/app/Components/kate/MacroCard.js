import React            from 'react';
import autoBind         from 'react-autobind';
import {Table, 
        TableBody, 
        TableHeader, 
        TableHeaderColumn, 
        TableRow, 
        TableRowColumn} from 'material-ui/Table';
import {Card, CardText} from 'material-ui/Card';
import Divider          from 'material-ui/Divider';

const style= {
    remove : {
       position:"absolute",
       top: "15px",
       right: "5px",
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
        height:"27px",
    },
}

function getCalories(protein, carb, fat)
{
    return (protein + carb) * 4 + fat * 9
}

export default (props) => {
    const styleInherit = Object.assign({},props.style)
    const defaultProps = {protein: 0, carb:0, fat:0, name: "Unknown"} 
    const {protein, carb, fat, name} = Object.assign({}, defaultProps, props);
    const calories = getCalories(protein, carb, fat);
    
    return  (
        <Card style={styleInherit}>
            <CardText>
                <div style={{display:"inline"}}>
                    <div style={style.title}>{name}</div>
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
                            <TableRowColumn>{protein}g</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Carbohydrates</TableRowColumn>
                            <TableRowColumn>{carb}g</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Fat</TableRowColumn>
                            <TableRowColumn>{fat}g</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardText>
        </Card>
    );
}        