import React, { Component } from "react";
import NoteListItemContainer from "./note_list_item_container";

class NotesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.currentNote && this.props.notes.length > 0) {
      this.props.switchNote(this.props.notes[0]);
    }
  }

  renderNotes() {
    return (
      <ul className="note-item-ul">
        {this.props.notes.map((note, idx) => (
          <NoteListItemContainer key={`note-${idx}`} note={note} />
        ))}
      </ul>
    );
  }

  render() {
    return <div>{this.renderNotes()}</div>;
  }
}

export default NotesList;
