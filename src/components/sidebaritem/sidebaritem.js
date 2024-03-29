import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditorComponent from './../editor/editor'
import { removeHTMLTags } from './../../helper';

class SidebarItemComponent extends React.Component {

  render() {

    const { _index, _note, classes, selectedNoteIndex } = this.props;
    
    return (
        <div key={_index}>
            <ListItem className={classes.listItem}
            onClick={() => this.selectNote(_note, _index)}
            selected={selectedNoteIndex === _index}
            alignItems = 'flex-start'>
                <div className={classes.textSection}>
                    <ListItemText 
                    primary={_note.title}
                    secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'}>
                    </ListItemText>
                </div>
                <DeleteIcon onClick={() => this.deleteNote(_note)} className={classes.deleteIcon}>
                </DeleteIcon>
            </ListItem>
        </div>
        
    )
}

    selectNote = (n, i) => this.props.selectNote(n, i);

    deleteNote = (note) => {
        if(window.confirm(`Are you sure you want to delete: ${note.title}`)) {
            this.props.deleteNote(note)
        }
    }
}

export default withStyles(styles)(SidebarItemComponent);