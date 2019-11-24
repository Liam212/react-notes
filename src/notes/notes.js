import React from 'react';
import './App.css';
import SidebarComponent from './../sidebar/sidebar';
import EditorComponent from './../editor/editor';
import { Redirect } from 'react-router-dom';

const firebase = require('firebase')

class Notes extends React.Component {

    constructor() {
        super()
        this.state = {
          selectedNoteIndex: null,
          selectedNote: null,
          notes: null,
          isLoggedIn: true,
          useruid: null
        }
      }

    render() {
        return (
        <div className="app-container">
          {
          this.state.isLoggedIn ? (
            <SidebarComponent 
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            deleteNote={this.deleteNote}
            selectNote={this.selectNote}
            newNote={this.newNote}></SidebarComponent>
            ) : (
            <Redirect to={{ pathname: '/login'}} />
            )}
          {
            this.state.selectedNote ?
            <EditorComponent selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}></EditorComponent> :
            null
          }

          
        </div>
        )
    }
    componentWillMount = () => {
      firebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr)
          this.props.history.push('/login');
          else {
            firebase
            .firestore()
            .collection('notes')
            .doc(_usr.uid)
            .collection('notes')
            .onSnapshot(serverUpdate => {
                const notes = serverUpdate.docs.map(_doc => {
                    const data = _doc.data();
                    data['id'] = _doc.id;

                    return data;
                });
                this.setState({ notes: notes, useruid: _usr.uid });
              })
          }
      });
    }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note })
  noteUpdate = (id, noteObj) => {
    firebase.firestore().collection('notes').doc(this.state.useruid).collection('notes').doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  newNote = async (title) => {
      const note = {
        title: title,
        body: ''
      };
      const newFromDB = await firebase
        .firestore()
        .collection('notes')
        .doc(this.state.useruid)
        .collection('notes')
        .add({
          title: note.title,
          body: note.body,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      const newID = newFromDB.id;
      await this.setState({ notes: [...this.state.notes, note] });
      const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
      this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });

  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase.firestore().collection('notes').doc(this.state.useruid).collection('notes').doc(note.id).delete();
  }


}


export default Notes;