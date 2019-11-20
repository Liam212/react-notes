import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';
const firebase = require('firebase')
class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      addingNote: false,
      title: null,
      notes: null
    };
  }

  render() {

    const { notes, classes, selectedNoteIndex } = this.props;

    if(notes) {
      return (
        <div className={classes.sidebarContainer}>
            <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>{ this.state.addingNote ? 'Cancel' : 'New Note' }</Button>
            {
              this.state.addingNote ? 
              <div>
                <input type="text" className={classes.newNoteInput} 
                placeholder="Enter note title.."
                onKeyUp={(e) => this.updateTitle(e.target.value)}/>
                <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>Submit Note</Button>
              </div> : 
              null
            }
            <List>
              {
                notes.map((_note, _index) => {
                  return (
                    <div key={_index}>
                     <SidebarItemComponent
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}>
                     </SidebarItemComponent>
                     <Divider></Divider>
                    </div>
                  )
                })
              }
            </List>
            <Button onClick={this.signOut} className={classes.signOutBtn}>Sign Out</Button>
        </div>
    )
    } else {
      return(<div></div>)
    }
  }


  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  }

  updateTitle = (txt) => {
    this.setState({ title: txt })
  }

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false })
  }
  
  selectNote = (n, i) => this.props.selectNote(n, i);

  deleteNote = (note) => this.props.deleteNote(note);

  signOut = () => firebase.auth().signOut();

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(async _usr => {
      if(!_usr)
        this.props.history.push('/login');
      else {
        firebase
          .firestore()
          .collection('notes')
          .where('users', 'array-contains', _usr.email)
          .onSnapshot(async res => {
            const notes = res.docs.map(_doc => _doc.data());
            this.setState({
              email: _usr.email,
              notes: notes
            });
          })
      }
  });
}

}

export default withStyles(styles)(SidebarComponent);